"use client";

import { useEffect, useState } from "react";
import { TbLoader2 } from "react-icons/tb";

// Category type
type Category = {
	name: string;
	slug: string;
	description?: string;
};

export const Categories = () => {
	// State
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	// Fetch
	const fetchCategories = async () => {
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/categories?page=1&limit=12`,
			);
			const resJson = await res.json();
			setCategories(resJson.data);
		} catch (err) {
			console.error("Unable to fetch categories:", err);
		} finally {
			setLoading(false);
		}
	};
	// Effect
	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		fetchCategories();
	}, []);
	return (
		<section className="pt-32">
			<div className="text-center mb-12">
				{/* Header */}
				<h2 className="text-3xl md:text-4xl font-bold text-primary-100 mb-3">
					Learning Categories
				</h2>
				{/* Description */}
				<p className="text-zinc-300">
					Discover subjects and topics to find tutors that match your learning goals.
				</p>
			</div>
			{/* Categories */}
			{loading ? (
				<div className="h-64 flex items-center justify-center">
					<TbLoader2
						size={48}
						className="text-primary-500 animate-spin"
					/>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
					{categories.map((category) => (
						<div
							key={category.slug}
							className="group cursor-default rounded-2xl border border-zinc-800 bg-[#151417] p-4 text-center transition duration-200 hover:border-primary-900"
						>
							<h3 className="text-xl font-semibold text-zinc-200 group-hover:text-primary-200 transition duration-200">
								{category.name}
							</h3>

							<p className="mt-1 text-zinc-400 text-sm">{category.description}</p>
						</div>
					))}
				</div>
			)}
		</section>
	);
};
