import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
	const images = [
		{
			source: "/images/kid-elearning.jpg",
			label: "Kid E-Learning",
			marginTop: 2.5,
			hideInMobile: true,
		},
		{
			source: "/images/man-elearning.jpg",
			label: "Man Sessioning",
			marginTop: 0,
			hideInMobile: false,
		},
		{
			source: "/images/elearning-accessories.jpg",
			label: "E-Learning Accessories",
			marginTop: 2.5,
			hideInMobile: true,
		},
	];
	return (
		<section
			id="hero"
			className="flex flex-col items-center justify-center gap-y-8 md:gap-y-12 py-10 md:py-20"
		>
			{/* Images */}
			<div className="flex items-start justify-center gap-4 md:gap-6 px-4">
				{images.map((image, idx) => (
					<div
						key={idx}
						className={`${image.hideInMobile ? "hidden md:block" : "block"}`}
					>
						<Image
							src={image.source}
							alt={image.label}
							width={350}
							height={350}
							priority
							className="border-2 md:border-3 border-primary-600 rounded-2xl md:rounded-3xl w-full max-w-70 md:max-w-[320px] lg:max-w-87.5 shadow-2xl shadow-primary-900/20"
							style={{
								marginTop:
									typeof window !== "undefined" && window.innerWidth > 768
										? `${image.marginTop}rem`
										: "0",
							}}
						/>
					</div>
				))}
			</div>

			{/* Texts */}
			<div className="space-y-6 text-center max-w-4xl px-4">
				<h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-primary-100 leading-[1.1] tracking-tight">
					Connect with Expert Tutors <br className="hidden md:block" />
					<span className="text-primary-400">Learn Anything</span>
				</h1>

				<p className="max-w-2xl mx-auto text-zinc-400 text-base md:text-lg lg:text-xl leading-relaxed">
					FortePath is a smart platform that connects learners to expert tutors.
					Browse profiles and book focused sessions instantly to achieve your goals.
				</p>
			</div>
			{/* Buttons */}
			<div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-6 sm:px-0">
				<Link
					href="/tutors"
					target="_blank"
				>
					<Button
						variant="primary"
						className="bg-primary-500 text-lg md:text-xl hover:bg-primary-600 active:bg-primary-600 transition-all duration-200"
						size="lg"
					>
						Browse Tutors
					</Button>
				</Link>
				<Link
					href="/auth/signup"
					target="_blank"
				>
					<Button
						variant="outline"
						className="border-primary-500 text-primary-500 text-lg md:text-xl hover:bg-primary-500 active:bg-primary-500 hover:text-foreground active:text-foreground transition-all duration-200"
						size="lg"
					>
						Become a Tutor
					</Button>
				</Link>
			</div>
		</section>
	);
};
