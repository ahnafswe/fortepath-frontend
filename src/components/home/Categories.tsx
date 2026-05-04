"use client";

import { useEffect, useState } from "react";

// Category type
type Category = {
	name: string;
	slug: string;
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
		fetchCategories();
	}, []);
	return (
		<section className="pt-32">
			<div className="text-center mb-12">
				{/* Header */}
				<h2 className="text-3xl md:text-4xl font-bold text-primary-100 mb-3">
					Featured Categories
				</h2>
				{/* Description */}
				<p className="text-zinc-300">
					Discover subjects and topics to find tutors that match your learning goals.
				</p>
			</div>
			{/* Categories */}
			{loading ? (
				<div className="text-center text-2xl font-semibold text-zinc-300">
					Loading ...
				</div>
			) : (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
					{categories.map((category) => (
						<div
							key={category.slug}
							className="group cursor-default rounded-full border border-zinc-700 bg-zinc-900 p-4 text-center transition duration-200 hover:border-primary-900 hover:bg-zinc-900/65"
						>
							<h3 className="text-xl font-semibold text-zinc-200 group-hover:text-primary-200 transition duration-200">
								{category.name}
							</h3>
						</div>
					))}
				</div>
			)}
		</section>
	);
};
