"use client";

import { Button, Form } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormFields {
	topic: string;
	dueDate: string;
	dueTime: string;
	duration: number;
	notes?: string;
}

export const CreateBookingForm = ({
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
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormFields>();

	// Handler for booking creation
	const handleBooking = async (form: FormFields) => {
		// Start loading
		setIsLoading(true);

		// Create booking
		const bookingRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/bookings`, {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				studentId: student.id,
				tutorId: tutorId,
				topic: form.topic,
				dueTime: `${form.dueDate}T${form.dueTime}:00+06:00`,
				duration: Number(form.duration),
				notes: form.notes || null,
			}),
		});

		// End loading
		setIsLoading(false);
		if (bookingRes.ok) {
			// Redirect to Bookings page
			router.push(`/dashboard${student.role === "ADMIN" ? "/admin" : ""}/bookings`);
		}
	};

	return (
		<div className="max-w-sm mx-auto">
			{/* Header */}
			<h1 className="text-3xl leading-[1.33] font-bold text-primary-100 text-center mb-2">
				Book A Session
			</h1>

			{/* Form */}
			<Form
				onSubmit={handleSubmit(handleBooking)}
				className="flex flex-col gap-2"
			>
				{/* Topic */}
				<div>
					<input
						type="text"
						placeholder="Topic"
						className="w-full px-3 py-1.5 rounded-[10px] bg-[#151417] border border-zinc-800 focus:outline-none focus:ring focus:ring-primary-700"
						{...register("topic", {
							required: "Topic is required",
							maxLength: {
								value: 100,
								message: "Maximum 100 characters allowed",
							},
						})}
					/>
					{errors.topic && (
						<p className="text-sm text-red-400 tracking-wide mt-0.5">
							{errors.topic.message}
						</p>
					)}
				</div>
				{/* Due Date */}
				<div>
					<input
						type="date"
						className="w-full px-3 py-1.5 rounded-[10px] bg-[#151417] text-zinc-200 border border-zinc-800 focus:outline-none focus:ring focus:ring-primary-700"
						{...register("dueDate", {
							required: "Due Date is required",
						})}
					/>
					{errors.dueDate && (
						<p className="text-sm text-red-400 tracking-wide mt-0.5">
							{errors.dueDate.message}
						</p>
					)}
				</div>
				{/* Due Time */}
				<div>
					<input
						type="time"
						className="w-full px-3 py-1.5 rounded-[10px] bg-[#151417] text-zinc-200 border border-zinc-800 focus:outline-none focus:ring focus:ring-primary-700"
						{...register("dueTime", {
							required: "Due Time is required",
						})}
					/>
					{errors.dueTime && (
						<p className="text-sm text-red-400 tracking-wide mt-0.5">
							{errors.dueTime.message}
						</p>
					)}
				</div>
				{/* Duration */}
				<div>
					<input
						type="number"
						min={5}
						step={5}
						max={180}
						placeholder="Duration (mins)"
						className="w-full px-3 py-1.5 rounded-[10px] bg-[#151417] border border-zinc-800 focus:outline-none focus:ring focus:ring-primary-700"
						{...register("duration", {
							required: "Duration is required",
							min: {
								value: 5,
								message: "Minimum 5 minutes required",
							},
							max: {
								value: 180,
								message: "Maximum 180 minutes allowed",
							},
						})}
					/>
					{errors.duration && (
						<p className="text-sm text-red-400 tracking-wide mt-0.5">
							{errors.duration.message}
						</p>
					)}
				</div>
				{/* Notes */}
				<div>
					<textarea
						placeholder="Notes (Opt.)"
						className="w-full px-3 py-2 rounded-xl bg-[#151417] border border-zinc-800 focus:outline-none focus:ring focus:ring-primary-600 resize-none"
						rows={3}
						{...register("notes", {
							maxLength: {
								value: 200,
								message: "Maximum 200 characters allowed",
							},
						})}
					/>
					{errors.notes && (
						<p className="text-sm text-red-400 tracking-wide mt-0.5">
							{errors.notes.message}
						</p>
					)}
				</div>
				{/* Submit button */}
				<Button
					type="submit"
					isPending={isLoading}
					className="mx-auto text-xl px-6 h-10 bg-primary-600 hover:bg-primary-600/90 rounded-lg transition duration-200"
				>
					Book
				</Button>
			</Form>
		</div>
	);
};
