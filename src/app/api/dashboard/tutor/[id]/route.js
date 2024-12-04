import ClassModel from "@/app/models/Classes";
import { mongodb } from "@/lib/mongodb";

import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  await mongodb();
  const classes = await ClassModel.findOne({ _id: id });
  return NextResponse.json({ classes });
}

export async function PUT(request, { params }) {
  const { id } = params;
  const { classTitle, classDetails, materials, schedule } =
    await request.json();
  await mongodb();
  await ClassModel.findByIdAndUpdate(id, {
    classTitle,
    classDetails,
    materials,
    schedule,
  });
  return NextResponse.json({ message: "Product updated" }, { status: 200 });
}

export async function DELETE(request, { params }) {
  const { id } = params;
  await mongodb();
  await ClassModel.findByIdAndDelete(id);
  return NextResponse.json({ message: "Product deleted" });
}
