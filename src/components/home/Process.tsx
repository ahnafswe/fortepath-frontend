import { processSteps as steps } from "@/data/process-steps";

export const Process = () => {
	return (
		<section className="pt-32 text-center">
			<div className="max-w-6xl mx-auto px-4">
				<div className="text-center max-w-2xl mx-auto mb-12">
					{/* Header */}
					<h2 className="text-3xl md:text-4xl font-bold text-primary-100 mb-3">
						How FortePath Works
					</h2>
					{/* Description */}
					<p className="text-zinc-300">
						A simple step-by-step journey from finding the right tutor to achieving
						your learning goals.
					</p>
				</div>
				{/* Steps */}
				<div className="relative">
					{/* Steps Connector */}
					<div className="hidden md:block absolute top-1/2 -translate-1/2 left-1/2 w-9/10 h-0.5 bg-primary-700" />
					{/* Steps Grid */}
					<div className="relative grid md:grid-cols-3 gap-10">
						{steps.map((step, idx) => {
							const Icon = step.icon;
							return (
								// Step Card
								<div
									key={idx}
									className="bg-[#151417] rounded-3xl p-5 text-center border border-zinc-800 hover:border-primary-900 transition duration-200 group"
								>
									{/* Icon */}
									<div className="relative z-10 mx-auto grid place-items-center size-14 rounded-full bg-primary-700 group-hover:bg-primary-600 text-white shadow-md transition duration-200">
										<Icon size={32} />
									</div>
									{/* Count */}
									<p className="mt-2 text-lg font-medium text-primary-500">
										Step {idx + 1}
									</p>
									{/* Title */}
									<h3 className="mt-1 text-xl font-semibold text-primary-50">
										{step.title}
									</h3>
									{/* Description */}
									<p className="mt-1 text-zinc-300">{step.description}</p>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
};
