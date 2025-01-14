export const calculateScaleAndPosition = (
  imageWidth,
  imageHeight,
  frameWidth,
  frameHeight
) => {
  let scale = 1;
  if (imageWidth / imageHeight > frameWidth / frameHeight) {
    const widthScale = frameWidth / imageWidth;
    const heightScale = frameHeight / imageHeight;
    scale = heightScale / widthScale;
  } else {
    const widthScale = frameWidth / imageWidth;
    const heightScale = frameHeight / imageHeight;
    scale = widthScale / heightScale;
  }

  // scale += 0.1;

  const x = 0;
  const y = 0;

  return { scale, position: { x, y } };
};

export const constrainPosition = (pos, currentScale) => {
  const maxX = (97.367 * currentScale - 97.367) / 2;
  const maxY = (132.292 * currentScale - 132.292) / 2;

  // Allow more freedom by increasing the maxX and maxY
  // const freedomFactor = 1.5; // Adjust this factor as needed

  return {
    x: Math.max(-maxX, Math.min(maxX, pos.x)),
    y: Math.max(-maxY, Math.min(maxY, pos.y)),
  };
};
