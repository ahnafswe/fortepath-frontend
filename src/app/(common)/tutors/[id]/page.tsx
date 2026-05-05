import { AddReviewForm } from "@/components/form/AddReviewForm";
import { CreateBookingForm } from "@/components/form/CreateBookingForm";
import { ReviewCard } from "@/components/shared/ReviewCard";
import { getServerSession } from "@/lib/utils";
import { Avatar, Chip } from "@heroui/react";
import { TbCurrencyDollar, TbMessage2Star, TbStar } from "react-icons/tb";

interface Category {
	id: string;
	name: string;
	slug: string;
	description: string;
}

interface Review {
	id: string;
	rating: number;
	feedback?: string;
	student: {
		name: string;
		image: string;
	};
}

export interface TutorProfile {
	id: string;
	designation: string;
	bio?: string;
	hourlyRate: number;
	user: {
		id: string;
		name: string;
		email: string;
		image?: string;
		tutorReviews: Review[];
	};
	tutorCategories: { category: Category }[];
}

type Props = {
	params: Promise<{
		id: string;
	}>;
};

const TutorDetailsPage = async ({ params }: Props) => {
	const { id } = await params;
	const sessionData = await getServerSession();
	const { user } = await sessionData;

	const tutorRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/tutors/${id}`, {
		cache: "no-store",
	});
	const { data: tutor }: { data: TutorProfile } = await tutorRes.json();

	const averageRating =
		tutor?.user.tutorReviews.length > 0
			? (
					tutor.user.tutorReviews.reduce(
						(sum, review) => sum + Number(review.rating),
						0,
					) / tutor.user.tutorReviews.length
				).toFixed(1)
			: "0.0";

	return (
		/* Responsive padding: fluid from mobile to desktop */
		<div className="min-h-[calc(100vh-15rem)] px-6 md:px-12 lg:px-24 xl:px-48 2xl:px-64 py-16 md:py-28 space-y-12">
			{tutor ? (
				<>
					{/* Tutor Info Card - Responsive width and stacking */}
					<div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start p-6 md:p-10 bg-zinc-900/50 border border-zinc-800/60 rounded-[2rem] md:rounded-4xl shadow-xl">
						{/* Profile Picture */}
						<Avatar className="size-24 md:size-32 rounded-2xl md:rounded-3xl border-2 border-primary-600/30 p-1 bg-zinc-800 shrink-0">
							<Avatar.Image
								src={tutor.user.image}
								alt={`${tutor.user.name} profile`}
								referrerPolicy="no-referrer"
							/>
						</Avatar>

						<div className="flex-1 text-center md:text-left">
							{/* Name */}
							<h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-100">
								{tutor.user.name}
							</h1>
							{/* Designation */}
							<p className="mt-2 text-primary-400 text-lg md:text-xl font-medium">
								{tutor.designation}
							</p>
							{/* Bio */}
							<p className="mt-4 text-zinc-400 leading-relaxed text-sm md:text-base italic">
								&quot;{tutor.bio}&quot;
							</p>

							{/* Categories */}
							<div className="mt-6 flex flex-wrap justify-center md:justify-start gap-2">
								{tutor.tutorCategories.map((tc) => (
									<Chip
										key={tc.category.slug}
										variant="soft"
										className="bg-primary-500/10 text-primary-400 border border-primary-500/20"
									>
										{tc.category.name}
									</Chip>
								))}
							</div>

							{/* Stats Bar */}
							<div className="mt-8 flex flex-wrap justify-center md:justify-start gap-6 text-sm md:text-base text-zinc-300 border-t border-zinc-800 pt-6">
								<div className="flex items-center gap-1.5">
									<TbCurrencyDollar
										className="text-primary-500"
										size={20}
									/>
									<span className="font-semibold">
										${tutor.hourlyRate}/hr
									</span>
								</div>
								<div className="flex items-center gap-1.5">
									<TbStar
										className="text-yellow-500"
										size={20}
									/>
									<span className="font-semibold">{averageRating}</span>
								</div>
								<div className="flex items-center gap-1.5">
									<TbMessage2Star
										className="text-blue-500"
										size={20}
									/>
									<span>
										{tutor.user.tutorReviews.length}{" "}
										{tutor.user.tutorReviews.length !== 1
											? "reviews"
											: "review"}
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Forms Section - Centered and max-width restricted for readability */}
					<div className="max-w-2xl mx-auto space-y-12">
						<CreateBookingForm
							student={user}
							tutorId={tutor.user.id}
						/>
						<AddReviewForm
							student={user}
							tutorId={tutor.user.id}
						/>
					</div>

					{/* Reviews List */}
					<div className="max-w-2xl mx-auto">
						<h3 className="text-2xl font-bold text-zinc-100 mb-6 text-center md:text-left">
							Student Feedback
						</h3>
						<div className="space-y-4">
							{tutor.user.tutorReviews.length > 0 ? (
								tutor.user.tutorReviews.map((review: Review) => (
									<ReviewCard
										key={review.id}
										review={review}
									/>
								))
							) : (
								<p className="text-center text-zinc-500 italic">
									No reviews yet for this tutor.
								</p>
							)}
						</div>
					</div>
				</>
			) : (
				<div className="max-w-md mx-auto flex items-center justify-center p-10 border border-dashed border-zinc-800 rounded-3xl">
					<span className="text-lg text-zinc-500 text-center">
						Tutor profile not found.
					</span>
				</div>
			)}
		</div>
	);
};

export default TutorDetailsPage;
