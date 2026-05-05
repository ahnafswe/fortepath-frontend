"use client";

import { Button, Form, Label, Slider } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormFields {
	feedback: string;
}

export const AddReviewForm = ({
	student,
	tutorId,
}: {
	student: { id: string; role: "STUDENT" | "ADMIN" };
	tutorId: string;
}) => {
	// Hooks
	const router = useRouter();

	// General states
	const [isLoading, setIsLoading] = useState(false);

	// Form states
	const [rating, setRating] = useState(0);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormFields>();

	// Handler for review creation
	const handleReview = async (form: FormFields) => {
		// Start loading
		setIsLoading(true);

		// Create review
		const reviewRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/reviews`, {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				studentId: student.id,
				tutorId: tutorId,
				rating: rating,
				feedback: form.feedback || null,
			}),
		});

		// End loading
		setIsLoading(false);
		if (reviewRes.ok) {
			// Refresh page
			router.refresh();
		}
	};

	return (
		<div className="max-w-sm mx-auto">
			{/* Header */}
			<h1 className="text-3xl leading-[1.33] font-bold text-primary-100 text-center mb-2">
				Add A Review
			</h1>

			{/* Form */}
			<Form
				onSubmit={handleSubmit(handleReview)}
				className="flex flex-col gap-4"
			>
				{/* Rating */}
				<Slider
					value={rating}
					onChange={(v) => setRating(v as number)}
					maxValue={5}
				>
					<Label>Rating</Label>
					<Slider.Output />
					<Slider.Track className="bg-[#151417]">
						<Slider.Fill />
						<Slider.Thumb />
					</Slider.Track>
				</Slider>
				{/* Feedback */}
				<div>
					<textarea
						placeholder="Feedback (Opt.)"
						className="w-full px-3 py-2 rounded-xl bg-[#151417] border border-zinc-800 focus:outline-none focus:ring focus:ring-primary-600 resize-none"
						rows={4}
						{...register("feedback", {
							maxLength: {
								value: 200,
								message: "Maximum 200 characters allowed",
							},
						})}
					/>
					{errors.feedback && (
						<p className="text-sm text-red-400 tracking-wide mt-0.5">
							{errors.feedback.message}
						</p>
					)}
				</div>
				{/* Submit button */}
				<Button
					type="submit"
					isPending={isLoading}
					className="-mt-2 mx-auto text-xl px-6 h-10 bg-primary-600 hover:bg-primary-600/90 rounded-lg transition duration-200"
				>
					Add Review
				</Button>
			</Form>
		</div>
	);
};
