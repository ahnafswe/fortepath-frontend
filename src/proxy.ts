import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "./lib/utils";

export const proxy = async (req: NextRequest) => {
	// Pathname
	const pathname = req.nextUrl.pathname;

	// Flags
	let isAuthenticated: boolean = false;
	let role: "STUDENT" | "TUTOR" | "ADMIN" | null = null;

	// Get session and user
	const { user } = await getServerSession();

	// If user's authenticated
	if (user) {
		// Update flags
		isAuthenticated = true;
		role = user.role;
	}

	// If user isn't authenticated at all
	if (!isAuthenticated) {
		// Redirect to Login page
		return NextResponse.redirect(new URL("/auth/login", req.url));
	}

	// If user role is Student
	if (
		role === "STUDENT" &&
		(pathname.startsWith("/dashboard/tutor") || pathname.startsWith("/dashboard/admin"))
	) {
		return NextResponse.redirect(new URL("/dashboard", req.url));
	}

	// If user role is Tutor
	if (role === "TUTOR" && pathname.startsWith("/dashboard") && !pathname.includes("/tutor")) {
		return NextResponse.redirect(new URL("/dashboard/tutor", req.url));
	}

	// If user role is Admin
	if (role === "ADMIN" && pathname.startsWith("/dashboard") && !pathname.includes("/admin")) {
		return NextResponse.redirect(new URL("/dashboard/admin", req.url));
	}

	return NextResponse.next();
};

export const config = {
	matcher: ["/dashboard/:path*", "/tutors/:id"],
};
