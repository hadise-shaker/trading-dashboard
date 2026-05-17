import { NextResponse } from "next/server";
import { users } from "@/lib/mock-db";

export async function POST(req: Request) {
	const { email, password } = await req.json();

	const normalizedEmail = email.toLowerCase();

	const user = users.find(
		(u) => u.email === normalizedEmail && u.password === password,
	);

	if (!user) {
		return NextResponse.json(
			{ message: "Invalid credentials" },
			{ status: 401 },
		);
	}

	const response = NextResponse.json({ success: true });

	response.cookies.set("isLoggedIn", "true", {
		path: "/",
	});

	response.cookies.set("user", normalizedEmail, {
		path: "/",
	});

	return response;
}
