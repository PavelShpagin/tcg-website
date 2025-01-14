"use server";

import { NextResponse } from "next/server";

export async function createCard(formData: FormData) {
  const cardData = {
    CardName: formData.get("CardName"),
    LvL: formData.get("LvL"),
    Cost: formData.get("Cost"),
    Attack: formData.get("Attack"),
    Health: formData.get("Health"),
    CardText: formData.get("CardText"),
    Class: formData.get("Class"),
    scale: formData.get("scale"),
    position: formData.get("position"),
    type: formData.get("type"),
  };

  // Perform server-side logic, e.g., saving to a database
  // const response = await someDatabaseFunction(cardData);

  // Simulate a successful response
  return NextResponse.json({
    success: true,
    message: "Card created successfully",
  });
}
