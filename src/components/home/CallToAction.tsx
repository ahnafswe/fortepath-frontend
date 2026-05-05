"use client";

import Link from "next/link";

export const CallToAction = () => {
	return (
		<section className="relative mt-20 md:mt-32 py-16 md:py-24 bg-zinc-950 rounded-[2rem] md:rounded-[3rem] overflow-hidden mx-4 md:mx-0">
			{/* BG Gradient */}
			<div className="absolute inset-0 bg-linear-to-r from-primary-500/20 via-primary-600/15 to-primary-500/20 blur-3xl opacity-60" />
			<div className="relative max-w-5xl mx-auto px-6 text-center">
				<h2 className="text-2xl md:text-4xl font-bold text-primary-100">
					Ready to Begin Your Journey?
				</h2>
				<div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
					<Link
						href="/tutors"
						className="w-full md:w-auto rounded-[10px] bg-primary-600 px-6 py-3 font-medium text-lg transition duration-250 hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/20 active:shadow-none"
					>
						Find a Tutor
					</Link>
					<Link
						href="/auth/signup"
						className="w-full md:w-auto rounded-[10px] border border-primary-500 px-6 py-3 text-lg text-primary-400 font-medium transition duration-250 hover:bg-primary-600 hover:text-foreground"
					>
						Become a Tutor
					</Link>
				</div>
			</div>
		</section>
	);
};
