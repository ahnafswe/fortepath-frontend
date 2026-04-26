import { cookies } from "next/headers";

export const getServerSession = async () => {
	const cookieStore = await cookies();

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/get-session`, {
		headers: {
			Cookie: cookieStore.toString(),
		},
		cache: "no-store",
	});

	const data = await res.json();

	return data;
};
