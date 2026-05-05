import { getServerSession } from "@/lib/utils";
import { Avatar } from "@heroui/react";

const TutorProfile = async () => {
	// Fetch tutor
	const sessionData = await getServerSession();
	const {
		session,
		user: { id },
	} = await sessionData;

	// Fetch tutor profile
	const tutorRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/tutors/${id}`, {
		cache: "no-store",
	});
	const { data: tutor } = await tutorRes.json();

	return (
		<div className="p-8  grid place-items-center">
			{/* Profile Card */}
			<div className="w-sm p-6 bg-primary-600/10 border border-primary-700 rounded-[calc(var(--radius)*2.5)]">
				{/* Profile Picture */}
				<Avatar
					size="lg"
					className="size-24 rounded-2xl mb-3 mx-auto"
				>
					<Avatar.Image
						src={tutor.user.image}
						alt="Profile Picture"
						referrerPolicy="no-referrer"
					/>
				</Avatar>
				{/* Name */}
				<h2 className="text-3xl font-bold text-center mb-6">{tutor.user.name}</h2>
				<div className="space-y-2">
					{/* Designation */}
					<div className="flex justify-between gap-x-4">
						<span className="text-lg">Designation</span>
						<span className="text-zinc-300/75">{tutor.designation}</span>
					</div>
					{/* Email */}
					<div className="flex justify-between gap-x-4">
						<span className="text-lg">Email</span>
						<span className="text-zinc-300/75">{tutor.user.email}</span>
					</div>
					{/* Hourly Rate */}
					<div className="flex justify-between gap-x-4">
						<span className="text-lg">Hourly Rate</span>
						<span className="text-zinc-300/75">${tutor.hourlyRate}/hr</span>
					</div>
					{/* Signup Date */}
					<div className="flex justify-between gap-x-4">
						<span className="text-lg">Joined on</span>
						<span
							className="text-zinc-300/75"
							title={new Date(tutor.createdAt).toLocaleString()}
						>
							{new Date(tutor.createdAt).toLocaleDateString()}
						</span>
					</div>
					{/* Last Login Date */}
					<div className="flex justify-between gap-x-4">
						<span className="text-lg">Logged in</span>
						<span
							className="text-zinc-300/75"
							title={new Date(session.createdAt).toLocaleString()}
						>
							{new Date(session.createdAt).toLocaleDateString()}
						</span>
					</div>
					{tutor.bio && (
						<div className="mt-4">
							<p className="text-lg mb-0.5">Biography</p>
							<p className="text-zinc-300/75 text-[15px]">{tutor.bio}</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TutorProfile;
