import ClassModel from "@/app/models/Classes";
import { mongodb } from "@/lib/mongodb";

import { NextResponse } from "next/server";

export async function POST(request) {
  const { classTitle, classDetails, materials, schedule } =
    await request.json();
  await mongodb();
  const newProduct = await ClassModel.create({
    classTitle,
    classDetails,
    materials,
    schedule,
  });
  return NextResponse.json(
    { message: "Product Created", newProduct },
    { status: 201 }
  );
}

export async function GET() {
  await mongodb();
  const classes = await ClassModel.find();
  return NextResponse.json({ classes });
}
