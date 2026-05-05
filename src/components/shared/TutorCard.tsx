import { Tutor } from "@/app/(common)/tutors/page";
import { Avatar, Chip } from "@heroui/react";
import Link from "next/link";

export const TutorCard = ({ tutor }: { tutor: Tutor }) => {
	// Calculate average rating
	const avgRating =
		tutor.user.tutorReviews.length > 0
			? (
					tutor.user.tutorReviews.reduce(
						(
							sum: number,
							review: {
								rating: number;
							},
						) => sum + Number(review.rating),
						0,
					) / tutor.user.tutorReviews.length
				).toFixed(1)
			: "0.0";

	return (
		<Link
			href={`/tutors/${tutor.id}`}
			target="_blank"
		>
			<div className="bg-[#151417] border border-zinc-800 rounded-2xl px-4 py-5 hover:border-primary-700 transition">
				<div className="flex items-center gap-3 mb-4 group">
					{/* Profile Picture */}
					<Avatar>
						<Avatar.Image
							src={tutor.user?.image}
							alt={`${tutor.user.name} profile picture`}
						/>
					</Avatar>
					<div>
						{/* Name */}
						<h3 className="font-semibold tracking-wide -mb-0.5 group-hover:text-primary-300 transition-colors duration-200">
							{tutor.user.name}
						</h3>
						{/* Designation */}
						<p className="text-[15px] text-zinc-300 group-hover:text-primary-200 transition-colors duration-200">
							{tutor.designation}
						</p>
					</div>
				</div>
				<div className="flex flex-wrap gap-1 mb-4">
					{/* Categories */}
					{tutor.tutorCategories.map(
						(tc: { category: { name: string; slug: string } }) => (
							// Category Chip
							<Chip
								// Category slug as key
								key={tc.category.slug}
								variant="primary"
								className="bg-primary-500/15 text-primary-400 tracking-wide"
							>
								{tc.category.name}
							</Chip>
						),
					)}
				</div>
				<div className="flex items-center justify-between text-zinc-400">
					{/* Hourly Rate */}
					<span>${tutor.hourlyRate}/hr</span>
					{/* Average Rating */}
					<span>⭐ {avgRating}</span>
				</div>
			</div>
		</Link>
	);
};
