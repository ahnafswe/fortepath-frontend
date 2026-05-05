import { Route } from "next";
import Link from "next/link";
import { TbUsers, TbCategory, TbCalendarTime, TbStar, TbLayoutDashboard } from "react-icons/tb";

const AdminDashboardBase = () => {
	const adminModules = [
		{
			title: "User Management",
			description:
				"Manage student and tutor accounts, verify profiles, and handle permissions.",
			href: "/dashboard/admin/users",
			icon: TbUsers,
			countLabel: "View Registry",
		},
		{
			title: "Course Categories",
			description:
				"Organize teaching domains, add new subjects, and manage discovery tags.",
			href: "/dashboard/admin/categories",
			icon: TbCategory,
			countLabel: "Manage Taxonomy",
		},
		{
			title: "Booking Oversight",
			description: "Monitor scheduled sessions, track completions, and handle disputes.",
			href: "/dashboard/admin/bookings",
			icon: TbCalendarTime,
			countLabel: "Review Logs",
		},
		{
			title: "Quality Control",
			description: "Moderate community reviews and maintain platform teaching standards.",
			href: "/dashboard/admin/reviews",
			icon: TbStar,
			countLabel: "Audit Feedback",
		},
	];

	return (
		<div className="p-4 md:p-8 flex-1 min-h-screen space-y-10">
			{/* Header: Purely Informational */}
			<header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-8">
				<div>
					<h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
						<TbLayoutDashboard className="text-primary-500" />
						Admin Console
					</h1>
					<p className="text-zinc-500 mt-1 italic">
						Logged in as System Administrator
					</p>
				</div>

				<div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800">
					<div className="size-2 rounded-full bg-green-500 animate-pulse" />
					<span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
						System Online
					</span>
				</div>
			</header>

			{/* Module Grid: Functional Navigation */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{adminModules.map((module) => (
					<Link
						key={module.href}
						href={module.href as Route}
						className="group p-6 bg-zinc-900/40 border border-zinc-800 rounded-3xl hover:bg-primary-900/5 hover:border-primary-900/50 transition-all duration-300"
					>
						<div className="flex items-start justify-between mb-4">
							<div className="size-12 rounded-2xl bg-zinc-800 text-primary-400 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
								<module.icon size={26} />
							</div>
							<span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 bg-zinc-800/50 px-2 py-1 rounded-md">
								Core Module
							</span>
						</div>
						<h2 className="text-xl font-bold text-zinc-100 group-hover:text-primary-300 transition-colors">
							{module.title}
						</h2>
						<p className="text-zinc-500 text-sm mt-2 leading-relaxed">
							{module.description}
						</p>
						<div className="mt-6 flex items-center text-xs font-bold text-primary-500 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
							{module.countLabel} →
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default AdminDashboardBase;
