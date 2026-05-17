import { NextResponse } from "next/server";

import { userStore } from "@/lib/mock-db";

export async function POST(req: Request) {
	const { email, password } = await req.json();

	const normalizedEmail = email.toLowerCase();

	const user = userStore.get(normalizedEmail);

	if (!user || user.password !== password) {
		return NextResponse.json(
			{
				message: "Invalid credentials",
			},
			{ status: 401 },
		);
	}

	const response = NextResponse.json({
		success: true,
	});

	// auth cookie
	response.cookies.set("isLoggedIn", "true", {
		path: "/",
	});

	// user cookie
	response.cookies.set("user", normalizedEmail, {
		path: "/",
	});

	return response;
}
