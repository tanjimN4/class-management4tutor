import UserModel from "@/app/models/Users";
import { mongodb } from "@/lib/mongodb";

import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  await mongodb();
  const users = await UserModel.findOne({ _id: id });
  return NextResponse.json({ users });
}
//jhk
export async function PATCH(request, { params }) {
  const { id } = params;
  const { role } = await request.json();
  await mongodb();
  await UserModel.findByIdAndUpdate(id, { role });
  return NextResponse.json({ message: "role updated" }, { status: 200 });
}

export async function DELETE(request, { params }) {
  const { id } = params;
  await mongodb();
  await UserModel.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted" });
}
