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
		<div className="min-h-[calc(100vh-15rem)] px-64 py-24">
			<div className="mb-10 text-center">
				{/* Header */}
				<h1 className="text-3xl md:text-4xl font-bold text-primary-100">
					Explore Categories
				</h1>
				{/* Subtext */}
				<p className="mt-3 text-zinc-300">
					Discover various learning categories that tutors are expert in.
				</p>
				{/* Categories Count */}
				<p className="mt-3 text-zinc-400">
					Showing <span className="text-primary-300/70">{totalCategories}</span>{" "}
					categories
				</p>
			</div>
			{/* Categories Grid */}
			<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
