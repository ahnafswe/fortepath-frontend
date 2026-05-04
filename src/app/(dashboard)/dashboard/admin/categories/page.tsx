import { TableHeader } from "@/components/shared/TableHeader";
import { cookies } from "next/headers";

type Category = {
	id: string;
	name: string;
	slug: string;
	description: string;
};

const AdminCategories = async () => {
	// Get cookie store
	const cookieStore = cookies();

	// Fetch and parse categories
	const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/categories`, {
		headers: {
			Cookie: (await cookieStore).toString(),
		},
		cache: "no-store",
	});
	const { total: totalCategories, data: categories } = await categoriesRes.json();

	return (
		<div className="p-8 flex-1">
			{/* Header */}
			<h2 className="text-4xl font-bold text-primary-200 mb-8">Categories</h2>
			{categories.length > 0 ? (
				<>
					{/* Categories Count */}
					<p className="text-center text-zinc-300/75 mb-2">
						Showing total {totalCategories} categor
						{totalCategories > 1 ? "ies" : "y"}
					</p>
					{/* Categories Table */}
					<div className="w-full flex flex-col cursor-default">
						<TableHeader cols={["Name", "Slug", "Description"]} />
						{categories.map((category: Category, idx: number) => (
							<div
								key={category.id}
								className={`${idx % 2 === 0 ? "bg-zinc-900/50" : "bg-zinc-900/65"} flex items-center py-2.5 text-center ${idx === totalCategories - 1 && "rounded-b-2xl"}`}
							>
								{/* Name */}
								<div className="px-2 flex-1 line-clamp-1">{category.name}</div>
								{/* Slug */}
								<div className="px-2 flex-1 line-clamp-1 text-zinc-300">
									{category.slug}
								</div>
								{/* Description */}
								<div
									className="px-2 flex-1 line-clamp-1 text-[15px]"
									title={category.description}
								>
									{category.description}
								</div>
							</div>
						))}
					</div>
				</>
			) : (
				<div className="flex flex-col justify-center h-[66vh]">
					<p className="text-center text-zinc-400 text-xl">
						There are no categories yet.
					</p>
				</div>
			)}
		</div>
	);
};

export default AdminCategories;
