import { features } from "@/data/features";

export const Features = () => {
	return (
		<section className="pt-32">
			<div className="text-center mb-12">
				{/* Header */}
				<h2 className="text-3xl md:text-4xl font-bold text-primary-100 mb-3">
					Everything You Need to Learn Confidently
				</h2>
				{/* Subtext */}
				<p className="text-zinc-300">
					FortePath makes it easy to find the right tutor, book focused sessions, and
					learn at your own pace.
				</p>
			</div>
			{/* Features */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{features.map((feature, idx) => {
					const Icon = feature.icon;
					return (
						<div
							key={idx}
							className="group rounded-3xl bg-[#151417] border border-zinc-800 p-6 transition hover:border-primary-900"
						>
							{/* Icon */}
							<div className="size-12 grid place-items-center rounded-xl bg-purple-900 text-purple-300 mb-4 transition group-hover:bg-purple-800 group-hover:text-purple-200">
								<Icon size={28} />
							</div>

							{/* Content */}
							<h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
							<p className="text-zinc-200 leading-relaxed">
								{feature.description}
							</p>
						</div>
					);
				})}
			</div>
		</section>
	);
};
