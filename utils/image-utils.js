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

export const constrainPosition = (pos, currentScale, imageWidth, imageHeight, frameWidth, frameHeight) => {
  console.log("logging...")
  console.log(pos);
  console.log(currentScale);
 
  const svgScale = 500.001 / 1.02 / 132.292;
  
  let actualWidth;
  let actualHeight;
  if (imageWidth / imageHeight > frameWidth / frameHeight) {
    actualWidth = frameWidth * currentScale;
    actualHeight = imageHeight * frameWidth / imageWidth * currentScale;
  } else {
    actualWidth = imageWidth * frameHeight / imageHeight * currentScale;
    actualHeight = frameHeight * currentScale;
  }

  console.log(actualWidth, actualHeight);
  const maxX = (actualWidth - frameWidth) / 2 / svgScale;
  const maxY = (actualHeight - frameHeight) / 2 / svgScale;
  console.log(maxX, maxY);

  return {
    x: Math.max(-maxX, Math.min(maxX, pos.x)),
    y: Math.max(-maxY, Math.min(maxY, pos.y)),
  };
};