"use client";

import { authClient, signInWithGoogle } from "@/lib/auth-client";
import { Button, Form, Label, Radio, RadioGroup } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TbBrandGoogle } from "react-icons/tb";

type Category = {
	id: string;
	name: string;
	description: string;
};

type FormFields = {
	name: string;
	image?: string;
	email: string;
	password: string;
	designation?: string;
	bio?: string;
	hourlyRate?: number;
	categoryIds: string[];
};

const SignupPage = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [role, setRole] = useState<"STUDENT" | "TUTOR">("STUDENT");
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		const fetchCategories = async () => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/categories`);
			const data = await res.json();
			setCategories(data.data);
		};
		fetchCategories();
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormFields>();

	const handleSignup = async (fields: FormFields) => {
		setIsLoading(true);

		const userRes = await authClient.signUp.email({
			email: fields.email,
			password: fields.password,
			name: fields.name,
			image: fields.image,
			role,
		});

		const user = userRes.data?.user;

		if (role === "TUTOR" && user) {
			await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/tutors`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userId: user.id,
					designation: fields.designation,
					bio: fields.bio,
					hourlyRate: Number(fields.hourlyRate),
					categoryIds: fields.categoryIds,
				}),
			});
		}

		setIsLoading(false);
		router.push("/auth/login");
	};

	return (
		// min-h-screen allows for vertical growth as form fields change
		// px-4 ensures the card doesn't hit mobile screen edges
		<div className="min-h-screen flex items-center justify-center py-12 md:py-24 px-4">
			<div className="w-full max-w-lg bg-[#151417]/60 border border-zinc-800 rounded-3xl p-6 md:p-8">
				<h1 className="text-2xl md:text-[27px] leading-tight font-bold text-primary-100 text-center mb-6">
					Create Your Account
				</h1>

				{/* Role Selection */}
				<RadioGroup
					value={role}
					onChange={(v) => setRole(v as "STUDENT" | "TUTOR")}
					orientation="horizontal"
					className="mb-8 mx-auto w-fit"
				>
					<Radio value="STUDENT">
						<Radio.Control className="bg-primary-600">
							<Radio.Indicator />
						</Radio.Control>
						<Radio.Content>
							<Label className="text-base cursor-pointer">Student</Label>
						</Radio.Content>
					</Radio>
					<Radio
						value="TUTOR"
						className="ml-4 md:ml-6"
					>
						<Radio.Control className="bg-primary-600">
							<Radio.Indicator />
						</Radio.Control>
						<Radio.Content>
							<Label className="text-base cursor-pointer">Tutor</Label>
						</Radio.Content>
					</Radio>
				</RadioGroup>

				<Form
					onSubmit={handleSubmit(handleSignup)}
					className="flex flex-col gap-4"
				>
					{/* General Fields */}
					<div className="flex flex-col gap-1">
						<input
							type="text"
							placeholder="Full Name"
							className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all"
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
							<p className="text-sm text-red-400 mt-1 pl-1">
								{errors.name.message}
							</p>
						)}
					</div>

					<div className="flex flex-col gap-1">
						<input
							type="url"
							placeholder="Image URL (Optional)"
							className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all"
							{...register("image", {
								maxLength: {
									value: 255,
									message: "Maximum 255 characters allowed",
								},
								pattern: {
									value: /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w\-.~:?#[\]@!$&'()*+,;=]*)?$/,
									message: "Must be a valid URL",
								},
							})}
						/>
						{errors.image && (
							<p className="text-sm text-red-400 mt-1 pl-1">
								{errors.image.message}
							</p>
						)}
					</div>

					<div className="flex flex-col gap-1">
						<input
							type="email"
							placeholder="Email Address"
							className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all"
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
							<p className="text-sm text-red-400 mt-1 pl-1">
								{errors.email.message}
							</p>
						)}
					</div>

					<div className="flex flex-col gap-1">
						<input
							type="password"
							placeholder="Password"
							className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all"
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
							<p className="text-sm text-red-400 mt-1 pl-1">
								{errors.password.message}
							</p>
						)}
					</div>

					{/* Tutor specific Fields */}
					{role === "TUTOR" && (
						<div className="flex flex-col gap-4 pt-4 border-t border-zinc-800 mt-2">
							<div className="flex flex-col gap-1">
								<input
									type="text"
									placeholder="Designation (e.g. Senior Math Tutor)"
									className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all"
									{...register("designation", {
										required: "Designation is required",
										maxLength: {
											value: 60,
											message: "Maximum 60 characters allowed",
										},
									})}
								/>
								{errors.designation && (
									<p className="text-sm text-red-400 mt-1 pl-1">
										{errors.designation.message}
									</p>
								)}
							</div>

							<div className="flex flex-col gap-1">
								<textarea
									placeholder="Brief Bio"
									className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary-600 resize-none"
									rows={3}
									{...register("bio", {
										maxLength: {
											value: 250,
											message: "Maximum 250 characters allowed",
										},
									})}
								/>
								{errors.bio && (
									<p className="text-sm text-red-400 mt-1 pl-1">
										{errors.bio.message}
									</p>
								)}
							</div>

							<div className="space-y-3">
								<label className="text-sm font-semibold text-zinc-400 px-1 tracking-wider">
									Expertise Categories
								</label>
								<div className="grid grid-cols-2 gap-3 p-1">
									{categories.map((category) => (
										<label
											key={category.id}
											className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-zinc-800/50 transition-colors"
										>
											<input
												type="checkbox"
												value={category.id}
												className="size-4 accent-primary-600"
												{...register("categoryIds", {
													required: "Select at least one category",
												})}
											/>
											<span className="text-sm text-zinc-400 group-hover:text-zinc-200 transition">
												{category.name}
											</span>
										</label>
									))}
								</div>
								{errors.categoryIds && (
									<p className="text-sm text-red-400 pl-1">
										{errors.categoryIds.message}
									</p>
								)}
							</div>

							<div className="flex flex-col gap-1">
								<input
									type="number"
									placeholder="Hourly Rate ($)"
									className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all"
									{...register("hourlyRate", {
										required: "Rate is required",
										min: { value: 0, message: "Min 0 required" },
										max: { value: 9999, message: "Max 9999 allowed" },
									})}
								/>
								{errors.hourlyRate && (
									<p className="text-sm text-red-400 mt-1 pl-1">
										{errors.hourlyRate.message}
									</p>
								)}
							</div>
						</div>
					)}

					<Button
						type="submit"
						fullWidth
						isPending={isLoading}
						className="mt-6 text-lg h-12 bg-primary-600 hover:bg-primary-500 transition-colors font-bold"
					>
						Create Account
					</Button>

					{role === "STUDENT" && (
						<Button
							type="button"
							fullWidth
							className="text-lg h-12 flex items-center gap-3 bg-zinc-100 text-zinc-900 hover:bg-zinc-200 transition-colors font-bold"
							onClick={signInWithGoogle}
						>
							<TbBrandGoogle className="size-6" />
							Continue with Google
						</Button>
					)}
				</Form>
			</div>
		</div>
	);
};

export default SignupPage;
