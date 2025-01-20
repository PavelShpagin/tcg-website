"use server";

import fs from "fs";
import path from "path";

export const getFontBase64 = (fontPath) => {
  const fontBuffer = fs.readFileSync(path.resolve(fontPath));
  return fontBuffer.toString("base64");
};
