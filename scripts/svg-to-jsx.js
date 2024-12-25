import { readFileSync } from "fs";
import { optimize } from "svgo";
import { transform } from "@svgr/core";
import prettier from "prettier";

// Configuration for SVGO
const svgoConfig = {
  multipass: true,
  plugins: [
    {
      // This is the default preset for SVGO.
      // You can override or disable certain sub-plugins here so fonts are retained.
      name: "preset-default",
      params: {
        overrides: {
          // Keep viewBox for responsiveness
          removeViewBox: false,
          // Keep stroke/fill attributes (not always necessary, but often helpful)
          removeUselessStrokeAndFill: false,
          // Do NOT remove <defs> to ensure embedded fonts aren't stripped out
          removeUselessDefs: false,
          // If you have unknown tags like <font> or <font-face>, you'll also need:
          removeUnknownsAndDefaults: false,
        },
      },
    },
    {
      // Remove certain attributes we likely don’t need
      name: "removeAttrs",
      params: {
        attrs: [
          "data-name",
          "inkscape:.*",
          "sodipodi:.*",
          "xmlns:xlink",
          "xmlns:svg",
          "xml:space",
          "xmlns:inkscape",
          "xmlns:sodipodi",
          "xmlns",
        ],
      },
    },
    {
      // We can still clean up IDs if desired
      name: "cleanupIds",
      params: {
        minify: false,
        remove: false,
      },
    },
    // If needed, you can also explicitly disable other plugins that
    // might remove or break font data, like removing any hidden elements.
    // {
    //   name: 'removeHiddenElems',
    //   active: false,
    // },
    {
      name: "removeXMLNS",
    },
    {
      name: "removeAttrs",
      params: {
        attrs: [
          "xmlns:svg",
          "xmlns:xlink",
          "xml:space",
          "xmlnsXlink",
          "xmlnsSvg",
        ],
      },
    },
  ],
};

// Configuration for SVGR
const svgrConfig = {
  plugins: ["@svgr/plugin-jsx"],
  jsx: {
    babelConfig: {
      plugins: [],
    },
  },
  prettier: true,
  prettierConfig: {
    parser: "babel",
    semi: true,
    singleQuote: true,
    tabWidth: 2,
  },
  // We'll run SVGO ourselves before handing data to SVGR, so set this to false.
  svgo: false,
  template: (variables, { tpl }) => {
    return tpl`
"use client";
import React from 'react';

const ${variables.componentName} = ({ className, ...props }) => (
  ${variables.jsx}
);

export default ${variables.componentName};
`;
  },
};

async function convertSvgToJsx(inputPath) {
  try {
    // Read SVG file
    const svg = readFileSync(inputPath, "utf8");

    // Optimize SVG with SVGO
    const optimizedSvg = optimize(svg, svgoConfig);

    if ("data" in optimizedSvg) {
      // Transform to JSX using SVGR
      const jsxCode = await transform(optimizedSvg.data, svgrConfig, {
        componentName: "BlueCardTemplate",
      });

      // Format with Prettier
      const formattedCode = await prettier.format(jsxCode, {
        parser: "babel",
        semi: true,
        singleQuote: true,
        tabWidth: 2,
      });
      return formattedCode;
    }
  } catch (error) {
    console.error("Error converting SVG to JSX:", error);
    throw error;
  }
}

// Main execution
const [, , inputFile] = process.argv;

if (!inputFile) {
  console.error("Please provide an input SVG file path");
  process.exit(1);
}

convertSvgToJsx(inputFile)
  .then((result) => console.log(result))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
