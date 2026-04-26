import { TutorsFilters } from "@/components/shared/TutorsFilters";
import { TutorsGrid } from "@/components/shared/TutorsGrid";

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
		`${process.env.NEXT_PUBLIC_API_URL}/tutors?${urlParams.toString()}`,
		{
			cache: "no-store",
		},
	);
	// Parse tutors response
	const { total: totalTutors, data: tutors }: { total: number; data: Tutor[] } =
		await tutorsRes.json();

	// Fetch categories and cache it with time revalidation
	const categoriesRes = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/categories?page=1&limit=100`,
		{
			next: {
				revalidate: 3600,
			},
		},
	);
	// Parse categories response
	const { data: categories } = await categoriesRes.json();

	return (
		<div className="min-h-[calc(100vh-15rem)] px-64 py-24">
			<div className="mb-12 text-center">
				<h1 className="text-3xl md:text-4xl font-bold text-primary-100">
					Browse Tutors
				</h1>
				<p className="mt-3 text-zinc-300">
					Discover experienced tutors and book dedicated learning sessions.
				</p>
				<p className="mt-3 text-zinc-400">
					Showing <span className="text-primary-300/70">{totalTutors}</span> tutors
				</p>
			</div>

			{/* Filters */}
			<TutorsFilters
				initialSearch={search}
				initialCategory={category}
				categories={categories}
			/>

			{/* Data Grid */}
			<TutorsGrid tutors={tutors} />
		</div>
	);
};

export default Tutors;
