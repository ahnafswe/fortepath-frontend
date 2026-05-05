import { getServerSession } from "@/lib/utils";
import { Avatar } from "@heroui/react";

const TutorProfile = async () => {
	// Fetch tutor session data
	const sessionData = await getServerSession();
	const {
		session,
		user: { id },
	} = await sessionData;

	// Fetch tutor profile from API
	const tutorRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/tutors/${id}`, {
		cache: "no-store",
	});
	const { data: tutor } = await tutorRes.json();

	return (
		<div className="p-4 md:p-8 lg:p-12 min-h-[80vh] grid place-items-center">
			{/* Profile Card */}
			<div className="w-full max-w-xl p-6 md:p-10 bg-zinc-900/40 border border-primary-900/30 rounded-[2rem] shadow-2xl backdrop-blur-sm">
				{/* Profile Header Area */}
				<div className="flex flex-col items-center mb-8">
					<Avatar className="size-24 md:size-32 rounded-3xl mb-4 border-2 border-primary-600 p-1 bg-zinc-800">
						<Avatar.Image
							src={tutor.user.image}
							alt="Profile Picture"
							referrerPolicy="no-referrer"
						/>
					</Avatar>
					<h2 className="text-3xl md:text-4xl font-bold text-center text-primary-50">
						{tutor.user.name}
					</h2>
					<span className="mt-2 px-4 py-1 rounded-full bg-primary-950 text-primary-400 text-sm font-medium border border-primary-900/50">
						{tutor.designation}
					</span>
				</div>

				{/* Details Grid */}
				<div className="space-y-4 md:space-y-6">
					<div className="grid gap-4 md:gap-2">
						{/* Detail Row Component Style */}
						{[
							{ label: "Email Address", value: tutor.user.email },
							{ label: "Hourly Rate", value: `$${tutor.hourlyRate}/hr` },
							{
								label: "Joined On",
								value: new Date(tutor.createdAt).toLocaleDateString(),
							},
							{
								label: "Last Login On",
								value: new Date(session.createdAt).toLocaleDateString(),
							},
						].map((detail, index) => (
							<div
								key={index}
								className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-zinc-800/50"
							>
								<span className="text-zinc-500 text-sm md:text-base font-medium">
									{detail.label}
								</span>
								<span className="text-zinc-200 text-sm md:text-base truncate">
									{detail.value}
								</span>
							</div>
						))}
					</div>

					{/* Biography Section */}
					{tutor.bio && (
						<div className="mt-6 p-4 rounded-2xl bg-zinc-800/30 border border-zinc-800">
							<h4 className="text-primary-300 font-semibold mb-2 text-sm md:text-base uppercase tracking-wider">
								Biography
							</h4>
							<p className="text-zinc-400 text-sm md:text-base leading-relaxed">
								{tutor.bio}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TutorProfile;
