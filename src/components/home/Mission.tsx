import { TbTarget, TbUsers, TbBulb } from "react-icons/tb";

export const Mission = () => {
	const pillars = [
		{
			title: "Accessibility",
			description:
				"Making quality education available to everyone, regardless of location or background.",
			icon: TbUsers,
		},
		{
			title: "Excellence",
			description:
				"Connecting learners with the best tutors to ensure outstanding educational outcomes.",
			icon: TbTarget,
		},
		{
			title: "Innovation",
			description:
				"Using technology to create personalized, effective learning experiences.",
			icon: TbBulb,
		},
	];

	return (
		<section className="pt-32">
			<div className="text-center mb-12">
				<h2 className="text-3xl md:text-4xl font-bold text-primary-100 mb-3">
					Our Mission & Values
				</h2>
				<p className="text-zinc-300">
					Empowering learners worldwide through personalized education.
				</p>
			</div>
			<div className="max-w-4xl mx-auto">
				<div className="text-center mb-8">
					<p className="text-lg text-zinc-200 leading-relaxed">
						At FortePath, we believe that everyone deserves access to exceptional
						education. Our platform bridges the gap between learners and expert
						tutors, creating opportunities for growth and success in an
						ever-changing world.
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{pillars.map((pillar, idx) => {
						const Icon = pillar.icon;
						return (
							<div
								key={idx}
								className="text-center p-6 rounded-3xl bg-[#151417] border border-zinc-800"
							>
								<div className="size-12 grid place-items-center rounded-xl bg-blue-900 text-blue-300 mb-4 mx-auto">
									<Icon size={28} />
								</div>
								<h3 className="text-lg font-semibold mb-2 text-primary-100">
									{pillar.title}
								</h3>
								<p className="text-zinc-200 leading-relaxed">
									{pillar.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};
