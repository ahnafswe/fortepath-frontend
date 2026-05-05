import { CategoryCard } from "@/components/shared/CategoryCard";

export interface Category {
	name: string;
	slug: string;
	description: string;
	tutorCategories: { tutorId: string }[];
}

const CategoriesPage = async () => {
	// Fetch categories with cache and ISR
	const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/categories`, {
		next: {
			revalidate: 3600,
		},
	});
	// Parse categories
	const { total: totalCategories, data: categories } = await categoriesRes.json();

	return (
		<div className="min-h-[calc(100vh-15rem)] px-6 md:px-12 lg:px-24 xl:px-48 2xl:px-64 py-20 md:py-32">
			<div className="mb-12 text-center px-4">
				{/* Header */}
				<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-100 tracking-tight">
					Explore Categories
				</h1>
				{/* Subtext */}
				<p className="mt-4 text-zinc-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
					Discover various learning categories that our expert tutors specialize in.
					Find the perfect niche for your learning journey.
				</p>
				{/* Categories Count Badge */}
				<div className="mt-6">
					<p className="inline-block px-4 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs md:text-sm text-zinc-400">
						Showing{" "}
						<span className="text-primary-400 font-medium">{totalCategories}</span>{" "}
						unique categories
					</p>
				</div>
			</div>

			{/* Categories Grid */}
			<div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{categories.map((category: Category) => (
					<CategoryCard
						key={category.slug}
						category={category}
					/>
				))}
			</div>
		</div>
	);
};

export default CategoriesPage;
