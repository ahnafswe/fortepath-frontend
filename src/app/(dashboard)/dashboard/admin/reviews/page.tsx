import { TableHeader } from "@/components/shared/TableHeader";
import { Avatar } from "@heroui/react";
import { cookies } from "next/headers";

type Review = {
	id: string;
	rating: number;
	feedback?: string;
	createdAt: string;
	tutor: {
		name: string;
		image: string;
		email: string;
	};
	student: {
		name: string;
		image: string;
		email: string;
	};
};

const AdminReviews = async () => {
	// Get cookie store
	const cookieStore = cookies();

	// Fetch and parse reviews
	const reviewsRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/reviews`, {
		headers: {
			Cookie: (await cookieStore).toString(),
		},
		cache: "no-store",
	});
	const { total: totalReviews, data: reviews } = await reviewsRes.json();

	return (
		<div className="p-8 flex-1">
			{/* Header */}
			<h2 className="text-4xl font-bold text-primary-200 mb-8">Reviews</h2>
			{reviews.length > 0 ? (
				<>
					{/* Reviews Count */}
					<p className="text-center text-zinc-300/75 mb-2">
						Showing total {totalReviews} review{totalReviews > 1 && "s"}
					</p>
					{/* Reviews Table */}
					<div className="w-full flex flex-col cursor-default">
						<TableHeader
							cols={["Student", "Tutor", "Rating", "Feedback", "Reviewed On"]}
						/>
						{reviews.map((review: Review, idx: number) => {
							// Rating color
							const ratingColor =
								review.rating > 3
									? "text-green-500"
									: review.rating < 3
										? "text-red-500"
										: "text-yellow-500";

							return (
								<div
									key={review.id}
									className={`${idx % 2 === 0 ? "bg-zinc-900/50" : "bg-zinc-900/65"} flex items-center py-2.5 text-center ${idx === totalReviews - 1 && "rounded-b-2xl"}`}
								>
									{/* Student */}
									<div
										className="px-2 flex items-center justify-center gap-x-2 flex-1"
										title={review.student.email}
									>
										{review.student.image && (
											<Avatar size="sm">
												<Avatar.Image src={review.student.image} />
											</Avatar>
										)}
										<span className="line-clamp-1">
											{review.student.name}
										</span>
									</div>
									{/* Tutor */}
									<div
										className="px-2 flex items-center justify-center gap-x-2 flex-1"
										title={review.tutor.email}
									>
										{review.tutor.image && (
											<Avatar size="sm">
												<Avatar.Image src={review.tutor.image} />
											</Avatar>
										)}
										<span className="line-clamp-1">
											{review.tutor.name}
										</span>
									</div>
									{/* Rating */}
									<div
										className={`px-2 text-lg flex-1 line-clamp-1 ${ratingColor}`}
									>
										{review.rating}
									</div>
									{/* Feedback */}
									<div
										className="px-2 flex-1 line-clamp-2 text-[15px]"
										title={review.feedback}
									>
										{review.feedback}
									</div>
									{/* Booked On */}
									<div
										className="px-2 flex-1 line-clamp-1"
										title={new Date(review.createdAt).toLocaleString()}
									>
										{new Date(review.createdAt).toLocaleDateString()}
									</div>
								</div>
							);
						})}
					</div>
				</>
			) : (
				<div className="flex flex-col justify-center h-[66vh]">
					<p className="text-center text-zinc-400 text-xl">
						There are no reviews yet.
					</p>
				</div>
			)}
		</div>
	);
};

export default AdminReviews;
