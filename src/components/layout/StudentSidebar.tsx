import Image from "next/image";
import Link from "next/link";

export const StudentSidebar = () => {
	return (
		<>
			<aside className="hidden lg:flex flex-col min-h-screen w-72 bg-[#151417]/60 border-r border-zinc-800 px-8 py-12 sticky top-0">
				{/* Logo */}
				<Link href="/">
					<div className="flex items-center gap-3 mb-16">
						<Image
							src="/logo.png"
							alt="Logo"
							width={48}
							height={48}
						/>
						<h4 className="text-3xl font-bold text-primary-100">Dashboard</h4>
					</div>
				</Link>
				{/* Links */}
				<div className="flex flex-col gap-y-4">
					<Link
						href="/dashboard"
						className="pl-3 -ml-3 text-lg border-l-2 border-l-transparent text-zinc-400 hover:text-primary-300 hover:border-l-primary-500 transition-all duration-200"
					>
						Dashboard
					</Link>
					<Link
						href="/dashboard/profile"
						className="pl-3 -ml-3 text-lg border-l-2 border-l-transparent text-zinc-400 hover:text-primary-300 hover:border-l-primary-500 transition-all duration-200"
					>
						Profile
					</Link>
					<Link
						href="/dashboard/bookings"
						className="pl-3 -ml-3 text-lg border-l-2 border-l-transparent text-zinc-400 hover:text-primary-300 hover:border-l-primary-500 transition-all duration-200"
					>
						Bookings
					</Link>
				</div>
			</aside>
			{/* Student Mobile Nav */}
			<nav className="lg:hidden fixed bottom-0 left-0 w-full bg-[#151417] border-t border-zinc-800 z-50 px-4 py-3">
				<div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-8">
					<Link
						href="/dashboard"
						className="whitespace-nowrap text-sm font-medium text-zinc-400 active:text-primary-400"
					>
						Dashboard
					</Link>
					<Link
						href="/dashboard/profile"
						className="whitespace-nowrap text-sm font-medium text-zinc-400 active:text-primary-400"
					>
						Profile
					</Link>
					<Link
						href="/dashboard/bookings"
						className="whitespace-nowrap text-sm font-medium text-zinc-400 active:text-primary-400"
					>
						Bookings
					</Link>
				</div>
			</nav>
		</>
	);
};
