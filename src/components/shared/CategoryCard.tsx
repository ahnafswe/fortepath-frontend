import { Category } from "@/app/(common)/categories/page";

export const CategoryCard = ({ category }: { category: Category }) => {
	return (
		<div
			key={category.slug}
			className="group cursor-default rounded-[1.25rem] border border-zinc-700 bg-[#151417] p-4 text-center transition duration-200 hover:border-primary-900 hover:bg-zinc-900/65"
		>
			{/* Name */}
			<h5 className="mb-1 text-xl font-semibold text-zinc-200 group-hover:text-primary-200 transition duration-200">
				{category.name}
			</h5>
			{/* Description */}
			<p className="text-zinc-300 text-[13px] tracking-wide">{category.description}</p>
			{/* Divider */}
			<div className="w-full h-px my-2 bg-zinc-700/60" />
			{/* Tutors Count */}
			<span className="text-sm text-zinc-300">
				Taught by{" "}
				<span className="font-semibold">{category.tutorCategories.length}</span> tutors
			</span>
		</div>
	);
};
