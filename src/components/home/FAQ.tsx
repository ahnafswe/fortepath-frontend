import { TbChevronDown } from "react-icons/tb";

export const FAQ = () => {
	const faqs = [
		{
			question: "How do I find the right tutor?",
			answer: "Browse our tutor directory by subject, expertise, and availability. Each tutor profile includes detailed information about their teaching style and experience.",
		},
		{
			question: "What subjects are available?",
			answer: "We offer tutoring in mathematics, science, languages, programming, arts, and many other subjects for all age groups and skill levels.",
		},
		{
			question: "How does payment work?",
			answer: "Payments are processed securely through our platform. You pay for sessions after they're completed, and tutors receive payment within 24 hours.",
		},
		{
			question: "Can I cancel or reschedule sessions?",
			answer: "Yes, you can cancel or reschedule sessions up to 24 hours in advance. Our flexible policy ensures you get the learning experience you need.",
		},
	];

	return (
		<section className="pt-32">
			<div className="text-center mb-12">
				<h2 className="text-3xl md:text-4xl font-bold text-primary-100 mb-3">
					Frequently Asked Questions
				</h2>
				<p className="text-zinc-300">
					Get answers to common questions about learning with FortePath.
				</p>
			</div>
			<div className="max-w-3xl mx-auto space-y-4">
				{faqs.map((faq, idx) => (
					<div
						key={idx}
						className="rounded-3xl bg-[#151417] border border-zinc-800 p-6"
					>
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-semibold text-primary-100">
								{faq.question}
							</h3>
							<TbChevronDown
								className="text-zinc-400"
								size={20}
							/>
						</div>
						<p className="text-zinc-200 mt-2 leading-relaxed">{faq.answer}</p>
					</div>
				))}
			</div>
		</section>
	);
};
