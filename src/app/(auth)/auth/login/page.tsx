"use client";

import { authClient, signInWithGoogle } from "@/lib/auth-client";
import { Button, Form } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TbBrandGoogle } from "react-icons/tb";

type FormFields = {
	email: string;
	password: string;
};

const LoginPage = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormFields>();

	const handleLogin = async (fields: FormFields) => {
		setIsLoading(true);
		const res = await authClient.signIn.email({
			email: fields.email,
			password: fields.password,
		});

		if (!res.data?.user) {
			alert(res.error?.message);
			setIsLoading(false);
			return;
		}

		setIsLoading(false);
		router.push("/");
	};

	return (
		// Changed h-screen to min-h-screen for mobile scrolling
		// Added px-4 to prevent the card from touching mobile screen edges
		<div className="min-h-screen flex items-center justify-center py-12 md:py-24 px-4">
			<div className="w-full max-w-lg bg-[#151417]/60 border border-zinc-800 rounded-3xl p-6 md:p-8">
				{/* Header */}
				<h1 className="text-2xl md:text-[27px] leading-tight font-bold text-primary-100 text-center mb-6">
					Welcome Back
				</h1>

				<Form
					onSubmit={handleSubmit(handleLogin)}
					className="flex flex-col gap-4"
				>
					{/* Email */}
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

					{/* Password */}
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

					<Button
						type="submit"
						fullWidth
						isPending={isLoading}
						className="mt-2 text-lg h-11 bg-primary-600 hover:bg-primary-500 transition-colors font-semibold"
					>
						Login
					</Button>

					<Button
						type="button"
						fullWidth
						className="text-lg h-11 flex items-center gap-3 bg-zinc-100 text-zinc-900 hover:bg-zinc-200 transition-colors font-semibold"
						onClick={signInWithGoogle}
					>
						<TbBrandGoogle className="size-5" />
						Continue with Google
					</Button>

					{/* Demo Section - Stacked on very small screens, grid on mobile/desktop */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
						<Button
							type="button"
							className="w-full bg-zinc-800 h-11 text-base hover:bg-zinc-700 transition-colors"
							onClick={() => {
								setValue("email", "promahnaf@gmail.com");
								setValue("password", "Kage@#250113");
							}}
						>
							Student Demo
						</Button>
						<Button
							type="button"
							className="w-full bg-zinc-800 h-11 text-base hover:bg-zinc-700 transition-colors"
							onClick={() => {
								setValue("email", "robert.c@example.com");
								setValue("password", "Robert#Chen");
							}}
						>
							Tutor Demo
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default LoginPage;
