import { getServerSession } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const Footer = async () => {
	const sessionData = await getServerSession();
	const user = sessionData?.user;

	return (
		<footer className="bg-zinc-950">
			<div className="px-6 md:px-12 lg:px-24 xl:px-48 2xl:px-80 pt-16 pb-8">
				<div className="grid gap-12 grid-cols-1 md:grid-cols-2">
					{/* Platform Info */}
					<div className="text-center md:text-left">
						<div className="flex items-center justify-center md:justify-start gap-3">
							<Image
								src="/logo.png"
								alt="Logo"
								width={40}
								height={40}
							/>
							<h4 className="text-2xl font-semibold">FortePath</h4>
						</div>
						<p className="mt-5 text-zinc-400 max-w-sm mx-auto md:mx-0 leading-relaxed">
							FortePath is a smart platform that connects learners to expert
							tutors.
						</p>
					</div>

					{/* Links */}
					<div className="text-center md:text-right">
						<h4 className="font-semibold uppercase tracking-wider text-zinc-400 mb-3">
							Explore
						</h4>
						<div className="flex flex-col gap-2">
							<Link
								href="/tutors"
								className="text-zinc-300 hover:text-primary-400 transition"
							>
								Find Tutors
							</Link>
							<Link
								href="/categories"
								className="text-zinc-300 hover:text-primary-400 transition"
							>
								Categories
							</Link>
							{!user ? (
								<Link
									href="/auth/login"
									className="text-zinc-300 hover:text-primary-400 transition"
								>
									Sign In
								</Link>
							) : (
								<Link
									// @ts-expect-error route exists
									href={`/dashboard${user.role !== "STUDENT" ? `/${user.role.toLowerCase()}` : ""}`}
									className="text-zinc-300 hover:text-primary-400 transition"
								>
									Dashboard
								</Link>
							)}
						</div>
					</div>
				</div>
				{/* Copyright Text */}
				<div className="mt-12 border-t border-zinc-800 pt-8 text-center text-zinc-400">
					© {new Date().getFullYear()} FortePath. All rights reserved.
				</div>
			</div>
		</footer>
	);
};
