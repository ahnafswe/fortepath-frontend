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

	// Handler for email-password login
	const handleLogin = async (fields: FormFields) => {
		// Start loading
		setIsLoading(true);

		// Log-in user
		const res = await authClient.signIn.email({
			email: fields.email,
			password: fields.password,
		});

		// If invalid credentials
		if (!res.data?.user) {
			alert(res.error?.message);
			setIsLoading(false);
			return;
		}

		// End loading
		setIsLoading(false);
		// Redirect to Home page
		router.push("/");
	};

	return (
		<div className="h-screen flex items-center justify-center py-24">
			<div className="w-full max-w-lg bg-zinc-900/60 border border-zinc-800 rounded-3xl p-7">
				{/* Header */}
				<h1 className="text-[27px] leading-[1.33] font-bold text-primary-100 text-center mb-4">
					Welcome Back
				</h1>

				{/* Login Form */}
				<Form
					onSubmit={handleSubmit(handleLogin)}
					className="flex flex-col gap-3"
				>
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
					{/* Submit button */}
					<Button
						type="submit"
						fullWidth
						isPending={isLoading}
						className="mt-4 text-lg h-10 bg-primary-600 hover:bg-primary-600/90 transition duration-200"
					>
						Login
					</Button>
					{/* Google Login button */}
					<Button
						type="button"
						fullWidth
						className="text-lg h-10 flex items-center gap-3 bg-primary-600 hover:bg-primary-600/90 transition duration-200"
						onClick={signInWithGoogle}
					>
						<TbBrandGoogle className="size-5" />
						Continue with Google
					</Button>
				</Form>
			</div>
		</div>
	);
};

export default LoginPage;
