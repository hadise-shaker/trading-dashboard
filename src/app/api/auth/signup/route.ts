import { NextResponse } from "next/server";
import { createUser, userExists } from "@/lib/mock-db";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const normalizedEmail = email.toLowerCase();

  if (userExists(normalizedEmail)) {
    return NextResponse.json({ message: "Email already exists" }, { status: 409 });
  }

  createUser({ name, email: normalizedEmail, password });

  return NextResponse.json({ success: true, message: "Account created successfully" });
}