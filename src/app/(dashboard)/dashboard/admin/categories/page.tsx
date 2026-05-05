import { TableHeader } from "@/components/shared/TableHeader";
import { cookies } from "next/headers";
import { TbLoader2, TbTag } from "react-icons/tb";

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
		<div className="p-4 md:p-8 flex-1 min-h-screen">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-2">
				<h2 className="text-3xl md:text-4xl font-bold text-primary-200">Categories</h2>
				<p className="text-zinc-400 text-sm md:text-base">
					Total{" "}
					<span className="text-primary-400 font-semibold">{totalCategories}</span>{" "}
					categor{totalCategories > 1 ? "ies" : "y"}
				</p>
			</div>

			{categories ? (
				<div className="w-full">
					{/* Responsive Container */}
					<div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
						{/* Mobile & Tablet View: Stacked Info */}
						<div className="block lg:hidden divide-y divide-zinc-800">
							{categories.map((category: Category) => (
								<div
									key={category.id}
									className="p-5 flex flex-col gap-2"
								>
									<div className="flex items-center justify-between">
										<h3 className="font-bold text-primary-100 flex items-center gap-2">
											<TbTag className="text-primary-500" />
											{category.name}
										</h3>
										<span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-400 font-mono">
											/{category.slug}
										</span>
									</div>
									<p className="text-sm text-zinc-400 leading-relaxed italic">
										&quot;{category.description}&quot;
									</p>
								</div>
							))}
						</div>

						{/* Laptop & Desktop View: Traditional Table */}
						<div className="hidden lg:flex flex-col cursor-default">
							<TableHeader cols={["Name", "Slug", "Description"]} />
							{categories.map((category: Category, idx: number) => (
								<div
									key={category.id}
									className={`${idx % 2 === 0 ? "bg-zinc-900/50" : "bg-zinc-900/65"} flex items-center py-4 text-center transition hover:bg-primary-900/10`}
								>
									{/* Name */}
									<div className="px-4 flex-1 font-semibold text-zinc-200">
										{category.name}
									</div>
									{/* Slug */}
									<div className="px-4 flex-1 font-mono text-sm text-primary-400/70">
										{category.slug}
									</div>
									{/* Description */}
									<div
										className="px-4 flex-2 text-zinc-400 text-sm line-clamp-1 italic"
										title={category.description}
									>
										{category.description}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			) : (
				<div className="flex items-center justify-center h-64">
					<TbLoader2
						size={48}
						className="text-primary-600 animate-spin"
					/>
				</div>
			)}
		</div>
	);
};

export default AdminCategories;
