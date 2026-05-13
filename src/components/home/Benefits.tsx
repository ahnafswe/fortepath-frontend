import { TbShield, TbClock, TbGlobe, TbHeart } from "react-icons/tb";

export const Benefits = () => {
	const benefits = [
		{
			title: "Secure & Safe Learning",
			description:
				"All sessions are conducted in a safe, monitored environment with privacy protection.",
			icon: TbShield,
		},
		{
			title: "Flexible Scheduling",
			description:
				"Book sessions at times that work for you, with tutors available across time zones.",
			icon: TbClock,
		},
		{
			title: "Global Community",
			description:
				"Connect with tutors and learners from around the world, expanding your horizons.",
			icon: TbGlobe,
		},
		{
			title: "Personalized Support",
			description:
				"Get the attention and guidance you need with one-on-one focused learning sessions.",
			icon: TbHeart,
		},
	];

	return (
		<section className="pt-32">
			<div className="text-center mb-12">
				<h2 className="text-3xl md:text-4xl font-bold text-primary-100 mb-3">
					Why Choose FortePath?
				</h2>
				<p className="text-zinc-300">
					Experience the benefits of personalized, flexible online learning.
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{benefits.map((benefit, idx) => {
					const Icon = benefit.icon;
					return (
						<div
							key={idx}
							className="rounded-3xl bg-[#151417] border border-zinc-800 p-6"
						>
							<div className="flex items-start gap-4">
								<div className="size-12 grid place-items-center rounded-xl bg-green-900 text-green-300 flex-shrink-0">
									<Icon size={24} />
								</div>
								<div>
									<h3 className="text-xl font-semibold mb-2 text-primary-100">
										{benefit.title}
									</h3>
									<p className="text-zinc-200 leading-relaxed">
										{benefit.description}
									</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};
