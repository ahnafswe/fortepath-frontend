import { getServerSession } from "@/lib/utils";
import { Avatar } from "@heroui/react";

const StudentProfile = async () => {
	// Fetch student
	const sessionData = await getServerSession();
	const { session, user } = await sessionData;

	return (
		<div className="p-8  grid place-items-center">
			{/* Profile Card */}
			<div className="min-w-sm p-6 bg-primary-600/10 border border-primary-700 rounded-2xl">
				{/* Profile Picture */}
				<Avatar
					size="lg"
					className="size-24 rounded-2xl mb-3 mx-auto"
				>
					<Avatar.Image
						src={user.image}
						alt="Profile Picture"
						referrerPolicy="no-referrer"
					/>
				</Avatar>
				{/* Name */}
				<h2 className="text-3xl font-bold text-center mb-6">{user.name}</h2>
				<div className="space-y-2">
					{/* Email */}
					<div className="flex items-center justify-between gap-x-4">
						<span className="text-lg">Email</span>
						<span className="text-zinc-300/75">{user.email}</span>
					</div>
					{/* Signup Date */}
					<div className="flex items-center justify-between gap-x-4">
						<span className="text-lg">Joined on</span>
						<span
							className="text-zinc-300/75"
							title={new Date(user.createdAt).toLocaleString()}
						>
							{new Date(user.createdAt).toLocaleDateString()}
						</span>
					</div>
					{/* Last Login Data */}
					<div className="flex items-center justify-between gap-x-4">
						<span className="text-lg">Logged in</span>
						<span
							className="text-zinc-300/75"
							title={new Date(session.createdAt).toLocaleString()}
						>
							{new Date(session.createdAt).toLocaleDateString()}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentProfile;
