import { Route } from "next";
import Link from "next/link";
import {
	TbVideo,
	TbUserCircle,
	TbAward,
	TbExternalLink,
} from "react-icons/tb";

const TutorDashboardBase = () => {
	const tutorModules = [
		{
			title: "Session Schedule",
			description:
				"View upcoming classes, manage your availability, and access meeting links for your students.",
			href: "/dashboard/tutor/sessions",
			icon: TbVideo,
			action: "Open Schedule",
		},
		{
			title: "Professional Profile",
			description:
				"Update your bio, designation, and expertise categories to attract more students to your sessions.",
			href: "/dashboard/tutor/profile",
			icon: TbUserCircle,
			action: "Edit Profile",
		},
	];

	return (
		<div className="p-4 md:p-8 flex-1 min-h-screen space-y-8">
			{/* Header: Personalized and Contextual */}
			<header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-10">
				<div className="space-y-1">
					<h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
						Tutor <span className="text-primary-500">Workspace</span>
					</h1>
					<p className="text-zinc-500 text-lg">
						Manage your teaching journey and student connections.
					</p>
				</div>

				<div className="flex gap-3">
					<div className="px-4 py-2 rounded-2xl bg-primary-950/30 border border-primary-900/50 flex items-center gap-2">
						<TbAward className="text-primary-400" />
						<span className="text-xs font-bold text-primary-200 uppercase tracking-widest">
							Expert Mentor
						</span>
					</div>
				</div>
			</header>

			{/* Main Operational Hub */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{tutorModules.map((module) => (
					<Link
						key={module.href}
						href={module.href as Route}
						className="group relative p-8 bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] hover:bg-zinc-900 transition-all duration-300 overflow-hidden"
					>
						<div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
							<module.icon size={120} />
						</div>

						<div className="relative z-10 space-y-4">
							<div className="size-14 rounded-2xl bg-zinc-800 text-primary-400 flex items-center justify-center group-hover:scale-110 transition-transform">
								<module.icon size={32} />
							</div>
							<h2 className="text-2xl font-bold text-zinc-100 italic">
								{module.title}
							</h2>
							<p className="text-zinc-400 leading-relaxed max-w-sm">
								{module.description}
							</p>
							<div className="pt-4 flex items-center gap-2 text-sm font-bold text-primary-500 group-hover:gap-4 transition-all">
								{module.action} <TbExternalLink />
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default TutorDashboardBase;
