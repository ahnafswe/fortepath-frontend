"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Form, Label, Radio, RadioGroup } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TbBrandGoogle } from "react-icons/tb";

type FormFields = {
	name: string;
	image?: string;
	email: string;
	password: string;
	designation?: string;
	bio?: string;
	hourlyRate?: number;
};

const SignupPage = () => {
	// Hooks
	const router = useRouter();

	// General states
	const [isLoading, setIsLoading] = useState(false);
	const [role, setRole] = useState<"STUDENT" | "TUTOR">("STUDENT");

	// Form states
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormFields>();

	// Handler for email-password signup
	const handleSignup = async (fields: FormFields) => {
		// Start loading
		setIsLoading(true);

		// Create user
		const userRes = await authClient.signUp.email({
			email: fields.email,
			password: fields.password,
			name: fields.name,
			image: fields.image,
			role,
		});

		// Extract created user data
		const user = userRes.data?.user;

		// If role is Tutor, create tutor profile
		if (role === "TUTOR") {
			await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userId: user?.id,
					designation: fields.designation,
					bio: fields.bio,
					hourlyRate: Number(fields.hourlyRate),
				}),
			});
		}

		// End loading
		setIsLoading(false);

		// Redirect to Login page
		router.push("/auth/login");
	};

	// Handler for Google signup
	const handleGoogleSignup = async () => {
		if (role !== "STUDENT") return;
		await authClient.signIn.social({
			provider: "google",
			callbackURL: "https://fortepath.vercel.app",
		});
	};

	return (
		<div className="h-screen flex items-center justify-center py-24">
			<div className="w-full max-w-lg bg-zinc-900/60 border border-zinc-800 rounded-3xl p-7">
				<h1 className="text-[27px] leading-[1.33] font-bold text-primary-100 text-center mb-4">
					Create Your Account
				</h1>
				{/* Role Selection */}
				<RadioGroup
					value={role}
					onChange={(v) => setRole(v as "STUDENT" | "TUTOR")}
					orientation="horizontal"
					className="mb-6 mx-auto w-fit"
				>
					<Radio value="STUDENT">
						<Radio.Control className="bg-primary-600">
							<Radio.Indicator />
						</Radio.Control>
						<Radio.Content>
							<Label className="text-base">Student</Label>
						</Radio.Content>
					</Radio>
					<Radio value="TUTOR">
						<Radio.Control className="bg-primary-600">
							<Radio.Indicator />
						</Radio.Control>
						<Radio.Content>
							<Label className="text-base">Tutor</Label>
						</Radio.Content>
					</Radio>
				</RadioGroup>

				<Form
					onSubmit={handleSubmit(handleSignup)}
					className="flex flex-col gap-3"
				>
					{/* General Fields */}

					{/* Name */}
					<div>
						<input
							type="text"
							placeholder="Full Name"
							className="w-full px-3 py-1.5 rounded-[10px] bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring focus:ring-primary-600"
							{...register("name", {
								required: "Name is required",
								maxLength: {
									value: 50,
									message: "Maximum 50 characters allowed",
								},
								validate: (value) =>
									value.trim().split(" ").length >= 2 ||
									"Minimum 2 words required",
							})}
						/>
						{errors.name && (
							<p className="text-sm text-red-400 tracking-wide mt-1">
								{errors.name.message}
							</p>
						)}
					</div>
					{/* Image */}
					<div>
						<input
							type="url"
							placeholder="Image URL (Optional)"
							className="w-full px-3 py-1.5 rounded-[10px] bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring focus:ring-primary-600"
							{...register("image", {
								maxLength: {
									value: 255,
									message: "Maximum 255 characters allowed",
								},
								pattern: {
									value: /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w\-.~:?#[\]@!$&'()*+,;=]*)?$/,
									message: "Image must be a valid URL",
								},
							})}
						/>
						{errors.image && (
							<p className="text-sm text-red-400 tracking-wide mt-1">
								{errors.image.message}
							</p>
						)}
					</div>
					{/* Email */}
					<div>
						<input
							type="email"
							placeholder="Email Address"
							className="w-full px-3 py-1.5 rounded-[10px] bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring focus:ring-primary-600"
							{...register("email", {
								required: "Email is required",
								maxLength: {
									value: 128,
									message: "Maximum 128 characters allowed",
								},
								validate: (value) =>
									(value.includes("@") && !value.includes(" ")) ||
									"Email format is invalid",
							})}
						/>
						{errors.email && (
							<p className="text-sm text-red-400 tracking-wide mt-1">
								{errors.email.message}
							</p>
						)}
					</div>
					{/* Password */}
					<div>
						<input
							type="password"
							placeholder="Password"
							className="w-full px-3 py-1.5 rounded-[10px] bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring focus:ring-primary-600"
							{...register("password", {
								required: "Password is required",
								minLength: {
									value: 6,
									message: "Minimum 6 characters required",
								},
								maxLength: {
									value: 128,
									message: "Maximum 128 characters allowed",
								},
								validate: (value) =>
									!value.includes(" ") || "Spaces are not allowed",
							})}
						/>
						{errors.password && (
							<p className="text-sm text-red-400 tracking-wide mt-1">
								{errors.password.message}
							</p>
						)}
					</div>

					{/* Tutor specific Fields */}

					{role === "TUTOR" && (
						<>
							{/* Designation */}
							<div>
								<input
									type="text"
									placeholder="Designation"
									className="w-full px-3 py-1.5 rounded-[10px] bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring focus:ring-primary-600"
									{...register("designation", {
										required: "Designation is required",
										maxLength: {
											value: 60,
											message: "Maximum 60 characters allowed",
										},
									})}
								/>
								{errors.designation && (
									<p className="text-sm text-red-400 tracking-wide mt-1">
										{errors.designation.message}
									</p>
								)}
							</div>
							{/* Bio */}
							<div>
								<textarea
									placeholder="Bio (Optional)"
									className="w-full px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring focus:ring-primary-600 resize-none"
									rows={4}
									{...register("bio", {
										maxLength: {
											value: 250,
											message: "Maximum 250 characters allowed",
										},
									})}
								/>
								{errors.bio && (
									<p className="text-sm text-red-400 tracking-wide mt-1">
										{errors.bio.message}
									</p>
								)}
							</div>
							{/* Hourly Rate */}
							<div>
								<input
									type="number"
									placeholder="Hourly Rate"
									className="w-full px-3 py-1.5 rounded-[10px] bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring focus:ring-primary-600"
									min={0}
									max={9999}
									{...register("hourlyRate", {
										required: "Hourly Rate is required",
										min: {
											value: 0,
											message: "Minimum 0 is required",
										},
										max: {
											value: 9999,
											message: "Maximum 9999 is allowed",
										},
									})}
								/>
								{errors.hourlyRate && (
									<p className="text-sm text-red-400 tracking-wide mt-1">
										{errors.hourlyRate.message}
									</p>
								)}
							</div>
						</>
					)}

					<Button
						type="submit"
						fullWidth
						isPending={isLoading}
						className="mt-4 text-lg h-10 bg-primary-600 hover:bg-primary-600/90 transition duration-200"
					>
						Sign Up
					</Button>

					{role === "STUDENT" && (
						<Button
							type="button"
							fullWidth
							className="text-lg h-10 flex items-center gap-3 bg-primary-600 hover:bg-primary-600/90 transition duration-200"
							onClick={handleGoogleSignup}
						>
							<TbBrandGoogle className="size-5" />
							Continue with Google
						</Button>
					)}
				</Form>
			</div>
		</div>
	);
};

export default SignupPage;
