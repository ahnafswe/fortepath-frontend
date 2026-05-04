import { TableHeader } from "@/components/shared/TableHeader";
import { Avatar } from "@heroui/react";
import { cookies } from "next/headers";
import { TbCheck } from "react-icons/tb";

type User = {
	id: string;
	name: string;
	image: string;
	email: string;
	emailVerified: boolean;
	role: "STUDENT" | "TUTOR" | "ADMIN";
	banned: boolean;
};

const AdminUsers = async () => {
	// Get cookie store
	const cookieStore = cookies();

	// Fetch and parse users
	const usersRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/users`, {
		headers: {
			Cookie: (await cookieStore).toString(),
		},
		cache: "no-store",
	});
	const { total: totalUsers, data: users } = await usersRes.json();

	return (
		<div className="p-8 flex-1">
			{/* Header */}
			<h2 className="text-4xl font-bold text-primary-200 mb-8">Users</h2>
			{users.length > 0 ? (
				<>
					{/* Users Count */}
					<p className="text-center text-zinc-300/75 mb-2">
						Showing total {totalUsers} user{totalUsers > 1 && "s"}
					</p>
					{/* Users Table */}
					<div className="w-full flex flex-col cursor-default">
						<TableHeader cols={["Image", "Name", "Email", "Role", "Banned"]} />
						{users.map((user: User, idx: number) => (
							<div
								key={user.id}
								className={`${idx % 2 === 0 ? "bg-zinc-900/50" : "bg-zinc-900/65"} flex items-center py-2.5 text-center ${idx === totalUsers - 1 && "rounded-b-2xl"}`}
							>
								{/* Profile Picture */}
								<div className="px-2 flex-1 flex justify-center">
									<Avatar>
										<Avatar.Image
											src={user.image}
											referrerPolicy="no-referrer"
										/>
									</Avatar>
								</div>
								{/* Name */}
								<div className="px-2 flex-1 line-clamp-1">{user.name}</div>
								{/* Email */}
								<div className="px-2 flex-1 flex items-center justify-center">
									{user.email}
									{user.emailVerified && <TbCheck className="ml-1" />}
								</div>
								{/* Role */}
								<div className="px-2 flex-1 capitalize">
									{user.role.toLowerCase()}
								</div>
								{/* Is Banned */}
								<div
									className={`px-2 flex-1 ${user.banned ? "text-red-500" : "text-green-500"}`}
								>
									{user.banned ? "Yes" : "No"}
								</div>
							</div>
						))}
					</div>
				</>
			) : (
				<div className="flex flex-col justify-center h-[66vh]">
					<p className="text-center text-zinc-400 text-xl">There are no users yet.</p>
				</div>
			)}
		</div>
	);
};

export default AdminUsers;
