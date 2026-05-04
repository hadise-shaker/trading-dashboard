import { NextResponse } from "next/server";
import { users } from "@/lib/mock-db";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "Missing fields" },
      { status: 400 }
    );
  }

  const normalizedEmail = email.toLowerCase();

  const existingUser = users.find(
    (u) => u.email === normalizedEmail
  );

  if (existingUser) {
    return NextResponse.json(
      { message: "Email already exists" },
      { status: 409 }
    );
  }

  users.push({
    name,
    email: normalizedEmail,
    password,
  });

  return NextResponse.json({
    success: true,
    message: "Account created successfully",
  });
}