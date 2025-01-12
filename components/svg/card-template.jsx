"use client";
import React from "react";

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
            preserveAspectRatio="xMidYMid slice"
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
                fontStretch: "expanded", // Changed from normal to expanded
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
