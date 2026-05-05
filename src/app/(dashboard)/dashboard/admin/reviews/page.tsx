import { TableHeader } from "@/components/shared/TableHeader";
import { Avatar } from "@heroui/react";
import { cookies } from "next/headers";
import { TbStarFilled, TbMessage2, TbArrowRight } from "react-icons/tb";

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
	const cookieStore = cookies();

	const reviewsRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/reviews`, {
		headers: {
			Cookie: (await cookieStore).toString(),
		},
		cache: "no-store",
	});
	const { total: totalReviews, data: reviews } = await reviewsRes.json();

	return (
		<div className="p-4 md:p-8 flex-1 min-h-screen">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-2">
				<h2 className="text-3xl md:text-4xl font-bold text-primary-200">Reviews</h2>
				<p className="text-zinc-400 text-sm md:text-base">
					Total <span className="text-primary-400 font-semibold">{totalReviews}</span>{" "}
					community reviews
				</p>
			</div>

			{reviews.length > 0 ? (
				<div className="w-full">
					<div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
						{/* Mobile & Tablet View: Feedback Cards */}
						<div className="block lg:hidden divide-y divide-zinc-800">
							{reviews.map((review: Review) => (
								<div
									key={review.id}
									className="p-5 space-y-4"
								>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-1">
											{[...Array(5)].map((_, i) => (
												<TbStarFilled
													key={i}
													size={14}
													className={
														i < review.rating
															? "text-yellow-500"
															: "text-zinc-700"
													}
												/>
											))}
										</div>
										<span className="text-xs text-zinc-500">
											{new Date(review.createdAt).toLocaleDateString()}
										</span>
									</div>

									<div className="flex items-center gap-3 bg-zinc-800/20 p-3 rounded-xl border border-zinc-800/50">
										<div className="flex items-center gap-2">
											<Avatar size="sm">
												<Avatar.Image src={review.student.image} />
											</Avatar>
											<span className="text-xs text-zinc-300 truncate w-16">
												{review.student.name.split(" ")[0]}
											</span>
										</div>
										<TbArrowRight className="text-zinc-600" />
										<div className="flex items-center gap-2">
											<Avatar size="sm">
												<Avatar.Image src={review.tutor.image} />
											</Avatar>
											<span className="text-xs text-zinc-300 truncate w-16">
												{review.tutor.name.split(" ")[0]}
											</span>
										</div>
									</div>

									<div className="flex gap-2">
										<TbMessage2 className="text-primary-500 shrink-0 mt-1" />
										<p className="text-sm text-zinc-400 leading-relaxed italic">
											&quot;
											{review.feedback || "No verbal feedback provided."}
											&quot;
										</p>
									</div>
								</div>
							))}
						</div>

						{/* Laptop & Desktop View: Traditional Table */}
						<div className="hidden lg:flex flex-col cursor-default">
							<TableHeader
								cols={["Student", "Tutor", "Rating", "Feedback", "Reviewed On"]}
							/>
							{reviews.map((review: Review, idx: number) => {
								const ratingColor =
									review.rating > 3
										? "text-green-500"
										: review.rating < 3
											? "text-red-500"
											: "text-yellow-500";

								return (
									<div
										key={review.id}
										className={`${idx % 2 === 0 ? "bg-zinc-900/50" : "bg-zinc-900/65"} flex items-center py-4 text-center transition hover:bg-primary-900/10`}
									>
										<div
											className="px-2 flex items-center justify-center gap-2 flex-1 min-w-0"
											title={review.student.email}
										>
											<Avatar size="sm">
												<Avatar.Image src={review.student.image} />
											</Avatar>
											<span className="truncate text-sm">
												{review.student.name}
											</span>
										</div>
										<div
											className="px-2 flex items-center justify-center gap-2 flex-1 min-w-0"
											title={review.tutor.email}
										>
											<Avatar size="sm">
												<Avatar.Image src={review.tutor.image} />
											</Avatar>
											<span className="truncate text-sm">
												{review.tutor.name}
											</span>
										</div>
										<div
											className={`px-2 text-lg font-bold flex-1 ${ratingColor}`}
										>
											{review.rating}/5
										</div>
										<div
											className="px-4 flex-2 text-sm text-zinc-400 italic line-clamp-1"
											title={review.feedback}
										>
											{review.feedback || "—"}
										</div>
										<div className="px-2 flex-1 text-sm text-zinc-500">
											{new Date(review.createdAt).toLocaleDateString()}
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center h-[60vh] border-2 border-dashed border-zinc-800 rounded-3xl">
					<p className="text-zinc-500 text-xl font-medium">
						No reviews have been submitted yet.
					</p>
				</div>
			)}
		</div>
	);
};

export default AdminReviews;
