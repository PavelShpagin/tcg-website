"use client";

import React from "react";
// import localFont from "next/font/local";

const franklinGothicBase64 =
  "data:font/woff2;base64,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";

/*
const franklinGothic = localFont({
  src: "../../public/fonts/FranklinGothic-Heavy.woff2",
  display: "swap",
});*/

const CardTemplate = ({
  className,
  imageUrl = "/card-placeholder.png",
  scale = 1,
  position = { x: 0, y: 0 },
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
  isDragging,
  cardData = {
    CardName: "",
    LvL: "",
    Cost: "",
    Attack: "",
    Health: "",
    CardText: "",
    Class: "Blue",
  },
  type,
  flip = false,
  ...props
}) => {
  console.log(type);
  const classStyles = {
    Blue: {
      gradients: ["#71afe1", "#94ddf4", "#c2edfb"],
      stroke: ["#569fd8", "#71afe1"],
      floodColor: "#5BA0B7",
    },
    Purple: {
      gradients: ["#955fcb", "#c493da", "#eac3fc"],
      stroke: ["#955fcb", "#955fcb"],
      floodColor: "#955fcb",
    },
  };
  const currentStyle = classStyles[cardData.Class] || classStyles.Blue;

  const splitTextIntoLines = (text, maxCharsPerLine = 25) => {
    // Split by actual newlines first, then by words
    const paragraphs = text.split("\n");
    const allLines = [];

    paragraphs.forEach((paragraph) => {
      const words = paragraph.split(" ");
      let currentLine = "";

      words.forEach((word) => {
        if ((currentLine + " " + word).length <= maxCharsPerLine) {
          currentLine = currentLine ? `${currentLine} ${word}` : word;
        } else {
          allLines.push(currentLine);
          currentLine = word;
        }
      });
      if (currentLine) {
        allLines.push(currentLine);
      }
    });
    return allLines;
  };

  const getTextWidth = (
    text,
    fontSize = "7.04109px",
    fontFamily = "Franklin Gothic Heavy"
  ) => {
    // Create canvas element if it doesn't exist
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Set the font
    context.font = `${fontSize} ${fontFamily}`;

    // Measure text
    const metrics = context.measureText(text);
    return metrics.width;
  };

  const getKeywordBoxes = (lines, keywordY) => {
    const boxes = [];

    const keywords = [
      { pattern: "On Play:", gradient: "f" },
      { pattern: "On Play", gradient: "f" },
      { pattern: "Death:", gradient: "g" },
      { pattern: "Death", gradient: "g" },
      { pattern: "On Attack:", gradient: "f" },
      { pattern: "On Attack", gradient: "f" },
      { pattern: "End of turn:", gradient: "f" },
      { pattern: "End of turn", gradient: "f" },
      { pattern: "Delay:", gradient: "f" },
      { pattern: "Delay", gradient: "f" },
      { pattern: "Double Strike", gradient: "f" },
      { pattern: "Immune", gradient: "f" },
      { pattern: "Shield 1", gradient: "f" },
      { pattern: "Shield 2", gradient: "f" },
      { pattern: "Shield 3", gradient: "f" },
    ];

    lines.forEach((line, lineIndex) => {
      keywords.forEach(({ pattern, gradient }) => {
        const pos = line.indexOf(pattern);
        if (pos !== -1) {
          const keywordWidth = getTextWidth(pattern);
          const preTextWidth = getTextWidth(line.substring(0, pos));

          const effectiveX = 48.4 - (getTextWidth(line) / 2 - preTextWidth);
          const effectiveY = keywordY + lineIndex * 8;

          // Check if a box with the same x and y already exists
          const boxExists = boxes.some(
            (box) => box.props.x === effectiveX && box.props.y === effectiveY
          );

          if (!boxExists) {
            boxes.push(
              <rect
                key={`box-${pattern}-${lineIndex}`}
                width={keywordWidth}
                height={7.49}
                x={effectiveX}
                y={effectiveY}
                ry={1.409}
                style={{
                  fontVariationSettings: "normal",
                  opacity: 0.765661,
                  fill: `url(#${gradient})`,
                  fillOpacity: 1,
                  fillRule: "evenodd",
                  stroke: currentStyle.stroke[0],
                  strokeWidth: 1.05738,
                  strokeLinecap: "butt",
                  strokeLinejoin: "round",
                  strokeMiterlimit: 4,
                  strokeDasharray: "none",
                  strokeDashoffset: 0,
                  strokeOpacity: 1,
                  stopColor: "#000",
                }}
              />
            );
          }
        }
      });
    });
    return boxes;
  };

  const getY = (lineCount) => {
    switch (lineCount) {
      case 1:
        return { keywordY: 93.204, startY: 70.704 };
      case 2:
        return { keywordY: 89.3, startY: 67.8665 };
      case 3:
        return { keywordY: 85, startY: 65.029 };
      case 4:
        return { keywordY: 85, startY: 65.029 };
      default:
        return { keywordY: 85, startY: 65.029 };
    }
  };

  const textLines = splitTextIntoLines(cardData.CardText);
  console.log(textLines);
  let { keywordY, startY } = getY(textLines.length);

  if (type === "Minion" && textLines.length == 3 && textLines[2].length < 20) {
    keywordY += 4.5;
    startY += 3;
  }

  if (type !== "Minion") {
    keywordY += 4.5;
    startY += 3;
  }

  const keywordBoxes = getKeywordBoxes(textLines, keywordY);

  return (
    <div className="relative" id="card-template-svg">
      <svg
        id="card-template"
        xmlns="http://www.w3.org/2000/svg"
        width={368.001 / 1.02}
        height={500.001 / 1.02}
        viewBox="0 0 97.367 132.292"
        className={className}
        {...props}
      >
        <style>
          {`
          @font-face {
            font-family: 'Franklin Gothic Heavy';
            src: url(${franklinGothicBase64}) format('woff2');
          }
        `}
        </style>
        <defs>
          <filter
            id="h"
            width={1.058}
            height={1.693}
            x={-0.029}
            y={-0.347}
            style={{
              colorInterpolationFilters: "sRGB",
            }}
          >
            <feFlood
              floodColor={currentStyle.floodColor}
              floodOpacity={1}
              result="flood"
            />
            <feComposite
              in="flood"
              in2="SourceGraphic"
              operator="in"
              result="composite1"
            />
            <feGaussianBlur in="composite1" result="blur" stdDeviation={0.5} />
            <feOffset dx={0} dy={0} result="offset" />
            <feComposite
              in="SourceGraphic"
              in2="offset"
              operator="over"
              result="composite2"
            />
          </filter>
          <filter
            id="i"
            width={1.046}
            height={1.165}
            x={-0.023}
            y={-0.083}
            style={{
              colorInterpolationFilters: "sRGB",
            }}
          >
            <feFlood
              floodColor={currentStyle.floodColor}
              floodOpacity={1}
              result="flood"
            />
            <feComposite
              in="flood"
              in2="SourceGraphic"
              operator="in"
              result="composite1"
            />
            <feGaussianBlur in="composite1" result="blur" stdDeviation={0.5} />
            <feOffset dx={0} dy={0} result="offset" />
            <feComposite
              in="SourceGraphic"
              in2="offset"
              operator="over"
              result="composite2"
            />
          </filter>
          <filter
            id="j"
            width={1.067}
            height={1.573}
            x={-0.033}
            y={-0.286}
            style={{
              colorInterpolationFilters: "sRGB",
            }}
          >
            <feFlood
              floodColor={currentStyle.floodColor}
              floodOpacity={1}
              result="flood"
            />
            <feComposite
              in="flood"
              in2="SourceGraphic"
              operator="in"
              result="composite1"
            />
            <feGaussianBlur in="composite1" result="blur" stdDeviation={0.5} />
            <feOffset dx={0} dy={0} result="offset" />
            <feComposite
              in="SourceGraphic"
              in2="offset"
              operator="over"
              result="composite2"
            />
          </filter>
          <filter
            id="m"
            width={1.292}
            height={1.663}
            x={-0.146}
            y={-0.331}
            style={{
              colorInterpolationFilters: "sRGB",
            }}
          >
            <feFlood
              floodColor={currentStyle.floodColor}
              floodOpacity={1}
              result="flood"
            />
            <feComposite
              in="flood"
              in2="SourceGraphic"
              operator="in"
              result="composite1"
            />
            <feGaussianBlur in="composite1" result="blur" stdDeviation={0.5} />
            <feOffset dx={0} dy={0} result="offset" />
            <feComposite
              in="SourceGraphic"
              in2="offset"
              operator="over"
              result="composite2"
            />
          </filter>
          <filter
            id="n"
            width={1.691}
            height={1.511}
            x={-0.346}
            y={-0.256}
            style={{
              colorInterpolationFilters: "sRGB",
            }}
          >
            <feFlood
              floodColor={currentStyle.floodColor}
              floodOpacity={1}
              result="flood"
            />
            <feComposite
              in="flood"
              in2="SourceGraphic"
              operator="in"
              result="composite1"
            />
            <feGaussianBlur in="composite1" result="blur" stdDeviation={0.5} />
            <feOffset dx={0} dy={0} result="offset" />
            <feComposite
              in="SourceGraphic"
              in2="offset"
              operator="over"
              result="composite2"
            />
          </filter>
          <filter
            id="o"
            width={1.645}
            height={1.496}
            x={-0.322}
            y={-0.248}
            style={{
              colorInterpolationFilters: "sRGB",
            }}
          >
            <feFlood
              floodColor={currentStyle.floodColor}
              floodOpacity={1}
              result="flood"
            />
            <feComposite
              in="flood"
              in2="SourceGraphic"
              operator="in"
              result="composite1"
            />
            <feGaussianBlur in="composite1" result="blur" stdDeviation={0.5} />
            <feOffset dx={0} dy={0} result="offset" />
            <feComposite
              in="SourceGraphic"
              in2="offset"
              operator="over"
              result="composite2"
            />
          </filter>
          <filter
            id="p"
            width={1.645}
            height={1.496}
            x={-0.322}
            y={-0.248}
            style={{
              colorInterpolationFilters: "sRGB",
            }}
          >
            <feFlood
              floodColor={currentStyle.floodColor}
              floodOpacity={1}
              result="flood"
            />
            <feComposite
              in="flood"
              in2="SourceGraphic"
              operator="in"
              result="composite1"
            />
            <feGaussianBlur in="composite1" result="blur" stdDeviation={0.5} />
            <feOffset dx={0} dy={0} result="offset" />
            <feComposite
              in="SourceGraphic"
              in2="offset"
              operator="over"
              result="composite2"
            />
          </filter>
          <radialGradient
            xlinkHref="#a"
            id="d"
            cx={322.779}
            cy={389.944}
            r={25.772}
            fx={322.779}
            fy={389.944}
            gradientTransform="matrix(.4057 0 0 .41215 -47.095 -40.97)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="e"
            cx={62.158}
            cy={71.497}
            r={27.169}
            fx={62.158}
            fy={71.497}
            gradientTransform="matrix(1.733 -.00533 .00195 .59624 -59.176 30.64)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="f"
            cx={12.953}
            cy={63.789}
            r={9.563}
            fx={12.953}
            fy={63.789}
            gradientTransform="matrix(2.50615 .02594 -.02482 2.25837 -4.742 -55.77)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="g"
            cx={12.953}
            cy={63.789}
            r={9.563}
            fx={12.953}
            fy={63.789}
            gradientTransform="matrix(2.50615 .02594 -.02482 2.25837 -9.546 -47.224)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#a"
            id="k"
            cx={12.873}
            cy={92.385}
            r={5.335}
            fx={12.873}
            fy={92.385}
            gradientTransform="matrix(1.47482 .05024 -.0521 1.44077 -.597 -104.925)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#a"
            id="l"
            cx={12.873}
            cy={92.385}
            r={5.335}
            fx={12.873}
            fy={92.385}
            gradientTransform="matrix(1.94634 .02128 -.02041 1.7584 -9.462 -42.925)"
            gradientUnits="userSpaceOnUse"
          />
          <linearGradient id="a">
            <stop
              offset={0}
              style={{
                stopColor: currentStyle.gradients[2],
                stopOpacity: 1,
              }}
            />
            <stop
              offset={1}
              style={{
                stopColor: currentStyle.gradients[0],
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient id="b">
            <stop
              offset={0}
              style={{
                stopColor: currentStyle.gradients[1],
                stopOpacity: 1,
              }}
            />
            <stop
              offset={1}
              style={{
                stopColor: currentStyle.gradients[0],
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <clipPath id="c" clipPathUnits="userSpaceOnUse">
            <rect
              width={63.5}
              height={88.9}
              x={-246.647}
              y={30.514}
              rx={0}
              ry={0}
              style={{
                fontVariationSettings: "normal",
                opacity: 0.419954,
                vectorEffect: "none",
                fill: "#00f",
                fillOpacity: 1,
                fillRule: "evenodd",
                strokeWidth: 0.282731,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                strokeDasharray: "none",
                strokeDashoffset: 0,
                strokeOpacity: 1,
                InkscapeStroke: "none",
                stopColor: "#000",
              }}
            />
          </clipPath>
          <clipPath id="cardClip">
            <rect x={0} y={0} width={97.367} height={132.292} rx={4} ry={4} />
          </clipPath>
        </defs>

        <g clipPath="url(#cardClip)">
          <image
            width={97.367}
            height={132.292}
            x={0}
            y={0}
            href={imageUrl}
            // preserveAspectRatio="xMidYMid"
            transform={`translate(${position.x} ${position.y}) scale(${flip ? -scale : scale}, ${scale})`}
            transformOrigin="center"
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            onMouseDown={onMouseDown}
            style={{
              cursor: isDragging ? "grabbing" : "grab",
            }}
          />
        </g>

        <rect
          width={82.246}
          height={12.208}
          x={7.56}
          y={66.835}
          ry={1.69}
          style={{
            fontVariationSettings: "normal",
            opacity: 0.87239,
            fill: "url(#e)",
            fillOpacity: 1,
            fillRule: "evenodd",
            stroke: currentStyle.stroke[0],
            strokeWidth: 1.05739,
            strokeLinecap: "butt",
            strokeLinejoin: "round",
            strokeMiterlimit: 4,
            strokeDasharray: "none",
            strokeDashoffset: 0,
            strokeOpacity: 1,
            stopColor: "#000",
          }}
        />
        {keywordBoxes}
        <text
          xmlSpace="preserve"
          style={{
            fontStyle: "normal",
            fontVariant: "normal",
            fontWeight: 400,
            fontStretch: "normal",
            fontSize: "4.87421px",
            lineHeight: 1.25,
            fontFamily: "Franklin Gothic Heavy",
            InkscapeFontSpecification: "&quot",
            fill: "#fff",
            fillOpacity: 1,
            strokeWidth: 0.121855,
            filter: "url(#h)",
          }}
          transform="matrix(1.4726183,0,0,1.4291704,1.9278672,2.8846697)"
        >
          <tspan
            x={31.84}
            y={50.633}
            style={{
              fontStyle: "normal",
              fontVariant: "normal",
              fontWeight: 400,
              fontStretch: "normal",
              fontFamily: "Franklin Gothic Heavy",
              InkscapeFontSpecification: "&quot",
              textAlign: "center",
              textAnchor: "middle",
              fill: "#fff",
              fillOpacity: 1,
              strokeWidth: 0.121855,
            }}
          >
            {cardData.Cost}
          </tspan>
        </text>
        <text
          xmlSpace="preserve"
          x={32.248}
          y={65.029}
          style={{
            fontStyle: "normal",
            fontVariant: "normal",
            fontWeight: 400,
            fontStretch: "normal",
            fontSize: "4.54004px",
            lineHeight: 1.25,
            fontFamily: "Franklin Gothic Heavy",
            InkscapeFontSpecification: "&quot",
            fill: "#fff",
            fillOpacity: 1,
            stroke: "none",
            strokeWidth: 0.2,
            strokeLinejoin: "round",
            strokeMiterlimit: 4,
            strokeDasharray: "none",
            strokeOpacity: 0.960784,
            filter: "url(#i)",
          }}
          transform="matrix(1.53332 0 0 1.4881 -.777 -6.3)"
        >
          {textLines.map((line, index) => (
            <tspan
              key={index}
              x={32.248}
              y={startY + index * 5.675}
              style={{
                fontStyle: "normal",
                fontVariant: "normal",
                fontWeight: 400,
                fontStretch: "expanded", // Changed from expanded to ultra-expanded
                fontFamily: "Franklin Gothic Heavy",
                InkscapeFontSpecification: "&quot",
                textAlign: "center",
                textAnchor: "middle",
                fill: "#fff",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.2,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: 4,
                strokeDasharray: "none",
                strokeOpacity: 0.960784,
              }}
            >
              {line}
            </tspan>
          ))}
        </text>
        <text
          xmlSpace="preserve"
          x={21.34}
          y={216.925}
          style={{
            fontStyle: "normal",
            fontVariant: "normal",
            fontWeight: 400,
            fontStretch: "normal",
            fontSize: "6.19046px",
            lineHeight: 1.25,
            fontFamily: "Franklin Gothic Heavy",
            InkscapeFontSpecification: "&quot",
            fill: "#fff",
            fillOpacity: 1,
            stroke: "none",
            strokeWidth: 0.272705,
            strokeMiterlimit: 4,
            strokeDasharray: "none",
            filter: "url(#j)",
          }}
          transform="matrix(1.53334 0 0 1.4881 16.192 -309.948)"
        >
          <tspan
            x={21.34}
            y={216.925}
            style={{
              fontStyle: "normal",
              fontVariant: "normal",
              fontWeight: 400,
              fontStretch: "normal",
              fontFamily: "Franklin Gothic Heavy",
              InkscapeFontSpecification: "&quot",
              textAlign: "center",
              textAnchor: "middle",
              fill: "#fff",
              fillOpacity: 1,
              stroke: "none",
              strokeWidth: 0.272705,
              strokeMiterlimit: 4,
              strokeDasharray: "none",
              strokeOpacity: 1,
            }}
          >
            {cardData.CardName}
          </tspan>
        </text>

        {(type === "Minion" || type === "Stage") && (
          <>
            <ellipse
              cx={13.575}
              cy={28.826}
              rx={7.644}
              ry={7.137}
              style={{
                opacity: 0.960557,
                fill: "url(#k)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: currentStyle.stroke[1],
                strokeWidth: 1.05738,
                strokeLinecap: "square",
                strokeLinejoin: "round",
                strokeMiterlimit: 4,
                strokeDasharray: "none",
                strokeOpacity: 1,
                paintOrder: "markers fill stroke",
              }}
            />

            <text
              xmlSpace="preserve"
              x={4.671}
              y={18.065}
              style={{
                fontStyle: "normal",
                fontVariant: "normal",
                fontWeight: 400,
                fontStretch: "normal",
                fontSize: "5.43197px",
                lineHeight: 1.25,
                fontFamily: "Franklin Gothic Heavy",
                InkscapeFontSpecification: "&quot",
                fill: "#fff",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.26,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: 4,
                strokeDasharray: "none",
                strokeOpacity: 1,
                paintOrder: "fill markers stroke",
                filter: "url(#m)",
              }}
              transform="scale(1.53333 1.4881)"
            >
              <tspan
                x={4.671}
                y={18.065}
                style={{
                  fontStyle: "normal",
                  fontVariant: "normal",
                  fontWeight: 400,
                  fontStretch: "normal",
                  fontFamily: "Franklin Gothic Heavy",
                  InkscapeFontSpecification: "&quot",
                  fill: "#fff",
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.26,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeMiterlimit: 4,
                  strokeDasharray: "none",
                  strokeOpacity: 1,
                  paintOrder: "fill markers stroke",
                }}
              >
                {"LvL"}
              </tspan>
            </text>
            <text
              xmlSpace="preserve"
              x={6.695}
              y={23.662}
              style={{
                fontStyle: "normal",
                fontVariant: "normal",
                fontWeight: 400,
                fontStretch: "normal",
                fontSize: "7.04109px",
                lineHeight: 1.25,
                fontFamily: "Franklin Gothic Heavy",
                InkscapeFontSpecification: "&quot",
                fill: "#fff",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.276,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: 4,
                strokeDasharray: "none",
                strokeOpacity: 1,
                filter: "url(#n)",
              }}
              transform="scale(1.53333 1.4881)"
            >
              <tspan
                x={8.695}
                y={23.662}
                style={{
                  fontStyle: "normal",
                  fontVariant: "normal",
                  fontWeight: 400,
                  fontStretch: "normal",
                  fontFamily: "Franklin Gothic Heavy",
                  InkscapeFontSpecification: "&quot",
                  fill: "#fff",
                  fillOpacity: 1,
                  textAlign: "center",
                  textAnchor: "middle",
                  stroke: "none",
                  strokeWidth: 0.276,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeMiterlimit: 4,
                  strokeDasharray: "none",
                  strokeOpacity: 1,
                }}
              >
                {cardData.LvL}
              </tspan>
            </text>
          </>
        )}

        {type === "Minion" && (
          <>
            <ellipse
              cx={13.708}
              cy={119.797}
              rx={9.482}
              ry={9.203}
              style={{
                opacity: 0.960557,
                fill: "url(#l)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: currentStyle.stroke[1],
                strokeWidth: 1.05738,
                strokeLinecap: "square",
                strokeLinejoin: "round",
                strokeMiterlimit: 4,
                strokeDasharray: "none",
                strokeOpacity: 1,
                paintOrder: "markers fill stroke",
              }}
            />
            <text
              xmlSpace="preserve"
              x={35.406}
              y={103.692}
              style={{
                fontStyle: "normal",
                fontVariant: "normal",
                fontWeight: 400,
                fontStretch: "normal",
                fontSize: "7.04109px",
                lineHeight: 1.25,
                fontFamily: "Franklin Gothic Heavy",
                InkscapeFontSpecification: "&quot",
                fill: "#fff",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.276,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: 4,
                strokeDasharray: "none",
                strokeOpacity: 1,
                filter: "url(#o)",
              }}
              transform="matrix(2.09486 0 0 2.03305 -65.09 -85.783)"
            >
              <tspan
                x={37.506}
                y={103.692}
                style={{
                  fontStyle: "normal",
                  fontVariant: "normal",
                  fontWeight: 400,
                  fontStretch: "normal",
                  fontFamily: "Franklin Gothic Heavy",
                  InkscapeFontSpecification: "&quot",
                  textAnchor: "middle",
                  fill: "#fff",
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.276,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeMiterlimit: 4,
                  strokeDasharray: "none",
                  strokeOpacity: 1,
                }}
              >
                {cardData.Attack}
              </tspan>
            </text>
          </>
        )}

        {type === "Minion" && (
          <>
            <path
              d="M82.867 111.105a32 32 0 0 1-8.876 2.635c-.038 3.249-.176 8.643 2.563 11.868a11.4 11.4 0 0 0 3.002 2.495l3.08 1.353c.718.316 1.535.32 2.257.012l3.016-1.288a11.3 11.3 0 0 0 3.048-2.42c2.8-3.15 2.794-9.211 2.824-11.804a37 37 0 0 1-9.939-3.312z"
              style={{
                opacity: 0.961,
                fill: "url(#d)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: currentStyle.stroke[1],
                strokeWidth: 1.05738,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: 4,
                strokeDasharray: "none",
                strokeOpacity: 0.960784,
                paintOrder: "normal",
              }}
            />
            <text
              xmlSpace="preserve"
              x={35.406}
              y={103.692}
              style={{
                fontStyle: "normal",
                fontVariant: "normal",
                fontWeight: 400,
                fontStretch: "normal",
                fontSize: "7.04109px",
                lineHeight: 1.25,
                fontFamily: "Franklin Gothic Heavy",
                InkscapeFontSpecification: "&quot",
                textAnchor: "middle",
                fill: "#fff",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.276,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: 4,
                strokeDasharray: "none",
                strokeOpacity: 1,
                filter: "url(#p)",
              }}
              transform="matrix(2.09486 0 0 2.03305 5.028 -85.813)"
            >
              <tspan
                x={37.406}
                y={103.692}
                style={{
                  fontStyle: "normal",
                  fontVariant: "normal",
                  fontWeight: 400,
                  fontStretch: "normal",
                  fontFamily: "Franklin Gothic Heavy",
                  InkscapeFontSpecification: "&quot",
                  textAnchor: "middle",
                  fill: "#fff",
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.276,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeMiterlimit: 4,
                  strokeDasharray: "none",
                  strokeOpacity: 1,
                }}
              >
                {cardData.Health}
              </tspan>
            </text>
          </>
        )}
      </svg>
    </div>
  );
};

export default CardTemplate;
