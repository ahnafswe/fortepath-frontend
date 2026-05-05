import { TableHeader } from "@/components/shared/TableHeader";
import { Avatar } from "@heroui/react";
import { cookies } from "next/headers";
import { TbCheck, TbUserOff, TbUserCheck } from "react-icons/tb";

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
	const cookieStore = cookies();

	const usersRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/users`, {
		headers: {
			Cookie: (await cookieStore).toString(),
		},
		cache: "no-store",
	});
	const { total: totalUsers, data: users } = await usersRes.json();

	return (
		<div className="p-4 md:p-8">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-2">
				<h2 className="text-3xl md:text-4xl font-bold text-primary-200">Users</h2>
				<p className="text-zinc-400 text-sm md:text-base">
					Total <span className="text-primary-400 font-semibold">{totalUsers}</span>{" "}
					accounts registered
				</p>
			</div>

			{users.length > 0 ? (
				<div className="w-full">
					{/* Responsive Table Wrapper */}
					<div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
						{/* Mobile & Tablet View: Stacked Cards / List */}
						<div className="block lg:hidden divide-y divide-zinc-800">
							{users.map((user: User) => (
								<div
									key={user.id}
									className="p-4 flex items-center justify-between gap-4"
								>
									<div className="flex items-center gap-3">
										<Avatar size="sm">
											<Avatar.Image
												src={user.image}
												referrerPolicy="no-referrer"
											/>
										</Avatar>
										<div className="flex flex-col">
											<span className="text-zinc-100 font-medium line-clamp-1">
												{user.name}
											</span>
											<span className="text-zinc-500 text-xs truncate max-w-37.5">
												{user.email}
											</span>
										</div>
									</div>
									<div className="flex flex-col items-end gap-1">
										<span
											className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${user.role === "ADMIN" ? "bg-purple-900/30 text-purple-400" : "bg-zinc-800 text-zinc-400"}`}
										>
											{user.role.toLowerCase()}
										</span>
										{user.banned ? (
											<TbUserOff className="text-red-500" />
										) : (
											<TbUserCheck className="text-green-500" />
										)}
									</div>
								</div>
							))}
						</div>

						{/* Laptop & Desktop View: Traditional Table */}
						<div className="hidden lg:flex flex-col cursor-default">
							<TableHeader cols={["Image", "Name", "Email", "Role", "Banned"]} />
							{users.map((user: User, idx: number) => (
								<div
									key={user.id}
									className={`${idx % 2 === 0 ? "bg-zinc-900/50" : "bg-zinc-900/65"} flex items-center py-4 text-center transition hover:bg-primary-900/10`}
								>
									<div className="px-2 flex-1 flex justify-center">
										<Avatar>
											<Avatar.Image
												src={user.image}
												referrerPolicy="no-referrer"
											/>
										</Avatar>
									</div>
									<div className="px-2 flex-1 font-medium text-zinc-200 line-clamp-1">
										{user.name}
									</div>
									<div className="px-2 flex-1 flex items-center justify-center text-zinc-400 text-sm">
										<span className="truncate">{user.email}</span>
										{user.emailVerified && (
											<TbCheck className="ml-1 text-primary-400" />
										)}
									</div>
									<div className="px-2 flex-1">
										<span className="capitalize bg-zinc-800/50 px-3 py-1 rounded-lg text-sm">
											{user.role.toLowerCase()}
										</span>
									</div>
									<div
										className={`px-2 flex-1 font-semibold ${user.banned ? "text-red-500" : "text-green-500"}`}
									>
										{user.banned ? "Banned" : "Active"}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center h-[60vh] border-2 border-dashed border-zinc-800 rounded-3xl">
					<p className="text-zinc-500 text-xl font-medium">
						No users found in the database.
					</p>
				</div>
			)}
		</div>
	);
};

export default AdminUsers;
