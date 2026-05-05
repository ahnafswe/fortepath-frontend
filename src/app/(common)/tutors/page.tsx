import { TutorsFilters } from "@/components/shared/TutorsFilters";
import { TutorsGrid } from "@/components/shared/TutorsGrid";
import { TbLoader2 } from "react-icons/tb";

export interface Tutor {
	id: string;
	designation?: string;
	hourlyRate: number;
	user: {
		id: string;
		name: string;
		email: string;
		image?: string;
		tutorReviews: {
			rating: number;
		}[];
	};
	tutorCategories: {
		category: {
			name: string;
			slug: string;
		};
	}[];
}

type Props = {
	searchParams: Promise<{
		search?: string;
		category?: string;
	}>;
};

const Tutors = async ({ searchParams }: Props) => {
	// Extract search and category from query params
	const search = (await searchParams).search ?? "";
	const category = (await searchParams).category ?? "";

	// Build URL with query params
	const urlParams = new URLSearchParams();

	// Append params if they've values
	if (search) urlParams.append("search", search);
	if (category) urlParams.append("category", category);

	// Fetch tutors and don't cache it
	const tutorsRes = await fetch(
		`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/tutors?${urlParams.toString()}`,
		{
			cache: "no-store",
		},
	);
	// Parse tutors response
	const { total: totalTutors, data: tutors }: { total: number; data: Tutor[] } =
		await tutorsRes.json();

	// Fetch categories and cache it with time revalidation
	const categoriesRes = await fetch(
		`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/categories?page=1&limit=100`,
		{
			next: {
				revalidate: 3600,
			},
		},
	);
	// Parse categories response
	const { data: categories } = await categoriesRes.json();

	return (
		<div className="min-h-[calc(100vh-15rem)] px-6 md:px-12 lg:px-24 xl:px-48 2xl:px-80 py-20 md:py-32">
			<div className="mb-8 md:mb-12 text-center px-4">
				<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-100 tracking-tight">
					Browse Tutors
				</h1>
				<p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
					Discover experienced tutors and book dedicated learning sessions. Expert
					guidance is just a few clicks away.
				</p>
				<div className="mt-6">
					<p className="inline-block px-4 py-1 rounded-full bg-primary-900/20 border border-primary-800/30 text-xs md:text-sm text-zinc-300">
						Showing{" "}
						<span className="text-primary-400 font-semibold">{totalTutors}</span>{" "}
						available tutors
					</p>
				</div>
			</div>

			{!tutors || !categories ? (
				<div className="flex flex-col items-center justify-center h-64 gap-4">
					<TbLoader2
						size={48}
						className="text-primary-600 animate-spin"
					/>
					<p className="text-zinc-500 animate-pulse">Loading mentors...</p>
				</div>
			) : (
				<div className="space-y-10">
					{/* Filters Section */}
					<div>
						<TutorsFilters
							initialSearch={search}
							initialCategory={category}
							categories={categories}
						/>
					</div>

					{/* Data Grid Section */}
					<div className="w-full">
						<TutorsGrid tutors={tutors} />
					</div>
				</div>
			)}
		</div>
	);
};

export default Tutors;
