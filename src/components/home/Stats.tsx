import { TbUsers, TbBook, TbStar, TbAward } from "react-icons/tb";

export const Stats = () => {
	const stats = [
		{
			number: "10,000+",
			label: "Active Learners",
			icon: TbUsers,
		},
		{
			number: "500+",
			label: "Expert Tutors",
			icon: TbBook,
		},
		{
			number: "95%",
			label: "Satisfaction Rate",
			icon: TbStar,
		},
		{
			number: "50+",
			label: "Subjects Covered",
			icon: TbAward,
		},
	];

	return (
		<section className="pt-32">
			<div className="text-center mb-12">
				<h2 className="text-3xl md:text-4xl font-bold text-primary-100 mb-3">
					Our Impact in Numbers
				</h2>
				<p className="text-zinc-300">
					See how FortePath is transforming education worldwide.
				</p>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
				{stats.map((stat, idx) => {
					const Icon = stat.icon;
					return (
						<div
							key={idx}
							className="text-center p-6 rounded-3xl bg-[#151417] border border-zinc-800"
						>
							<div className="size-12 grid place-items-center rounded-xl bg-primary-900 text-primary-300 mb-4 mx-auto">
								<Icon size={28} />
							</div>
							<div className="text-2xl md:text-3xl font-bold text-primary-100 mb-1">
								{stat.number}
							</div>
							<p className="text-zinc-200">{stat.label}</p>
						</div>
					);
				})}
			</div>
		</section>
	);
};
