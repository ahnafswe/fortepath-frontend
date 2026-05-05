import Image from "next/image";
import { TbUsers, TbRocket, TbTarget, TbHeartHandshake } from "react-icons/tb";

const AboutPage = () => {
	const values = [
		{
			title: "Community First",
			description:
				"We believe learning is a social journey. FortePath is designed to foster genuine relationships between students and mentors.",
			icon: TbUsers,
		},
		{
			title: "Expertise Verified",
			description:
				"Every tutor on our platform undergoes a rigorous verification process to ensure you learn from the best in the industry.",
			icon: TbTarget,
		},
		{
			title: "Seamless Learning",
			description:
				"From instant booking to integrated session tracking, we remove the friction so you can focus on mastering new skills.",
			icon: TbRocket,
		},
		{
			title: "Trust & Safety",
			description:
				"Your safety is our priority. We maintain a secure environment built on transparency and verified profiles.",
			icon: TbHeartHandshake,
		},
	];

	return (
		<main className="px-6 md:px-12 lg:px-24 xl:px-48 2xl:px-80 py-20 md:py-32 space-y-24">
			{/* Mission Section */}
			<section className="flex flex-col lg:flex-row items-center gap-12">
				<div className="flex-1 space-y-6 text-center lg:text-left">
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-100 tracking-tight leading-tight">
						Our Mission to <br />
						<span className="text-primary-500">Empower Learners</span>
					</h1>
					<p className="text-zinc-300 text-lg md:text-xl leading-relaxed max-w-2xl">
						FortePath was built to solve a simple problem: finding the right mentor
						shouldn&apos;t be hard. We created a full-stack ecosystem where expert
						tutors and passionate students connect instantly to share knowledge and
						build the future together.
					</p>
				</div>
				<div className="flex-1 relative w-full aspect-square max-w-md lg:max-w-none">
					<div className="absolute inset-0 bg-primary-600/20 blur-3xl rounded-full animate-pulse" />
					<Image
						src="/images/man-elearning.jpg"
						alt="Our Mission"
						fill
						className="object-cover rounded-[3rem] border-2 border-primary-900/50 relative z-10"
					/>
				</div>
			</section>

			{/* Values Grid */}
			<section className="space-y-12">
				<div className="text-center space-y-4">
					<h2 className="text-3xl md:text-4xl font-bold text-zinc-100">
						Why FortePath?
					</h2>
					<p className="text-zinc-400 max-w-2xl mx-auto">
						Built with a modern stack—Postgres, Prisma, and Next.js—to provide the
						reliability and speed that today&apos;s digital learners demand.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{values.map((value, idx) => {
						const Icon = value.icon;
						return (
							<div
								key={idx}
								className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-3xl hover:border-primary-900 transition-all duration-300 group"
							>
								<div className="size-14 rounded-2xl bg-primary-950 text-primary-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
									<Icon size={32} />
								</div>
								<h3 className="text-xl font-bold text-zinc-100 mb-3">
									{value.title}
								</h3>
								<p className="text-zinc-400 text-sm leading-relaxed">
									{value.description}
								</p>
							</div>
						);
					})}
				</div>
			</section>
		</main>
	);
};

export default AboutPage;
