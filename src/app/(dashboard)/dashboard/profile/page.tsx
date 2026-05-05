import { getServerSession } from "@/lib/utils";
import { Avatar } from "@heroui/react";

const StudentProfile = async () => {
	// Fetch student session and user data
	const sessionData = await getServerSession();
	const { session, user } = await sessionData;

	return (
		<div className="p-4 md:p-8 lg:p-12 min-h-[80vh] grid place-items-center">
			{/* Profile Card */}
			<div className="w-full max-w-md p-6 md:p-10 bg-zinc-900/40 border border-primary-900/30 rounded-[2.5rem] shadow-2xl backdrop-blur-sm">
				{/* Profile Picture Header */}
				<div className="flex flex-col items-center mb-8">
					<Avatar className="size-24 md:size-28 rounded-3xl mb-4 border-2 border-primary-600 p-1 bg-zinc-800 shadow-lg shadow-primary-900/20">
						<Avatar.Image
							src={user.image}
							alt="Profile Picture"
							referrerPolicy="no-referrer"
						/>
					</Avatar>

					{/* Name */}
					<h2 className="text-2xl md:text-3xl font-bold text-center text-primary-50">
						{user.name}
					</h2>
					<p className="text-zinc-500 text-sm mt-1 uppercase tracking-widest font-semibold">
						Student Account
					</p>
				</div>

				{/* Information List */}
				<div className="space-y-4">
					{[
						{ label: "Email Address", value: user.email },
						{
							label: "Joined Platform",
							value: new Date(user.createdAt).toLocaleDateString(),
						},
						{
							label: "Last Session",
							value: new Date(session.createdAt).toLocaleDateString(),
						},
					].map((item, index) => (
						<div
							key={index}
							className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-zinc-800/50 gap-y-1"
						>
							<span className="text-zinc-500 text-sm font-medium">
								{item.label}
							</span>
							<span className="text-zinc-200 text-sm md:text-base font-medium truncate max-w-full">
								{item.value}
							</span>
						</div>
					))}
				</div>

				{/* Account Actions / Status */}
				<div className="mt-8 pt-6 border-t border-zinc-800 flex justify-center">
					<div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-900/10 border border-green-900/20">
						<div className="size-2 rounded-full bg-green-500 animate-pulse" />
						<span className="text-green-500 text-xs font-bold uppercase tracking-tighter">
							Verified Student
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentProfile;
