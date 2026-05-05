import { Route } from "next";
import Link from "next/link";
import { TbSearch, TbCalendarCheck, TbUserCircle, TbArrowRight } from "react-icons/tb";

const StudentDashboardBase = () => {
	const studentModules = [
		{
			title: "Find a Tutor",
			description:
				"Explore our community of expert mentors across various categories and book your next session.",
			href: "/tutors",
			icon: TbSearch,
			cta: "Browse Tutors",
		},
		{
			title: "My Bookings",
			description:
				"Manage your upcoming sessions, view meeting details, and check your learning schedule.",
			href: "/dashboard/student/bookings",
			icon: TbCalendarCheck,
			cta: "View Schedule",
		},
	];

	return (
		<div className="p-4 md:p-8 flex-1 min-h-screen space-y-10">
			{/* Header: Personalized and Direct */}
			<header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800 pb-10">
				<div className="space-y-1">
					<h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
						Learning <span className="text-primary-500">Hub</span>
					</h1>
					<p className="text-zinc-500 text-lg">
						Welcome back! Your journey to mastery continues here.
					</p>
				</div>

				<Link href="/dashboard/profile">
					<div className="flex items-center gap-3 p-2 pr-6 rounded-full bg-zinc-900 border border-zinc-800 hover:border-primary-900/50 transition-colors group">
						<div className="size-10 rounded-full bg-primary-600 flex items-center justify-center text-white">
							<TbUserCircle size={24} />
						</div>
						<span className="text-sm font-semibold text-zinc-300 group-hover:text-primary-300 transition-colors">
							Manage Account
						</span>
					</div>
				</Link>
			</header>

			{/* Core Navigation: Large Action Cards */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{studentModules.map((module) => (
					<Link
						key={module.href}
						href={module.href as Route}
						className="group p-8 bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] hover:bg-primary-900/5 hover:border-primary-900/40 transition-all duration-300"
					>
						<div className="flex items-center justify-between mb-6">
							<div className="size-14 rounded-2xl bg-zinc-800 text-primary-400 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
								<module.icon size={32} />
							</div>
							<TbArrowRight
								className="text-zinc-700 group-hover:text-primary-500 group-hover:translate-x-2 transition-all"
								size={24}
							/>
						</div>
						<h2 className="text-2xl font-bold text-zinc-100 italic">
							{module.title}
						</h2>
						<p className="text-zinc-500 mt-3 leading-relaxed">
							{module.description}
						</p>
						<div className="mt-8 text-xs font-black uppercase tracking-tighter text-primary-600">
							{module.cta}
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default StudentDashboardBase;
