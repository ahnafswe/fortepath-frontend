import { guarantees } from "@/data/guarantees";

export const Trust = () => {
	return (
		<section className="pt-32">
			<div className="text-center mb-12">
				{/* Header */}
				<h2 className="text-3xl md:text-4xl font-bold text-primary-100 mb-3">
					A Community Built on Trust
				</h2>
				{/* Subtext */}
				<p className="text-zinc-300 max-w-xl mx-auto">
					FortePath is designed to foster genuine relationships between learners and
					experts through transparency and verified profiles.
				</p>
			</div>

			{/* Trust Cards */}
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{guarantees.map((item, idx) => {
					const Icon = item.icon;
					return (
						<div
							key={idx}
							className="group rounded-3xl bg-zinc-900 border border-primary-950 p-6 transition hover:border-primary-900"
						>
							{/* Icon Container */}
							<div className="size-11 grid place-items-center rounded-lg bg-purple-900 text-purple-300 mb-4 transition group-hover:bg-purple-800 group-hover:text-purple-200">
								<Icon size={28} />
							</div>

							{/* Content */}
							<h3 className="text-lg font-semibold mb-1 text-white">
								{item.title}
							</h3>
							<p className="text-zinc-400 leading-relaxed text-sm">
								{item.description}
							</p>
						</div>
					);
				})}
			</div>
		</section>
	);
};
