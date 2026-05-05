"use client"; // Note: Needed for the mobile toggle state

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, Button, Dropdown } from "@heroui/react";
import { TbMenu2, TbX } from "react-icons/tb";
import { Logout } from "./Logout";
import { Route } from "next";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Navbar = ({ user }: { user: any }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const navLinks = [
		{ name: "Home", href: "/" },
		{ name: "Tutors", href: "/tutors" },
		{ name: "Categories", href: "/categories" },
		{ name: "About", href: "/about" },
	];

	return (
		<nav className="bg-background/75 backdrop-blur-md fixed top-0 left-0 w-full px-6 md:px-12 lg:px-24 xl:px-48 2xl:px-80 py-4 shadow-md shadow-black/7.5 z-50">
			<div className="flex items-center justify-between">
				{/* Logo */}
				<Link
					href="/"
					onClick={() => setIsMenuOpen(false)}
				>
					<div className="flex items-center gap-2 md:gap-3 group hover:scale-105 transition-transform duration-250">
						<Image
							src="/logo.png"
							alt="Logo"
							width={32}
							height={32}
							className="md:size-10"
						/>
						<h3 className="text-xl md:text-3xl font-bold tracking-wide group-hover:text-primary-300 transition-colors duration-250">
							FortePath
						</h3>
					</div>
				</Link>

				{/* Desktop Links */}
				<div className="hidden lg:flex items-center gap-3 text-lg">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href as Route}
							className="px-3 py-1.5 rounded-lg hover:text-primary-400 hover:bg-primary-900/20 transition-colors duration-250"
						>
							{link.name}
						</Link>
					))}
				</div>

				{/* Right Side: Auth + Mobile Toggle */}
				<div className="flex items-center gap-2 md:gap-3">
					<div className="hidden sm:flex items-center gap-2 md:gap-3">
						{!user ? (
							<>
								<Link href="/auth/signup">
									<Button
										variant="primary"
										className="bg-primary-600 text-sm md:text-[17px] h-9 md:h-12 transition-all duration-200"
									>
										Sign Up
									</Button>
								</Link>
								<Link href="/auth/login">
									<Button
										variant="outline"
										className="border-primary-600 text-primary-500 text-sm md:text-[17px] h-9 md:h-12 transition-all duration-200"
									>
										Login
									</Button>
								</Link>
							</>
						) : (
							<UserDropdown user={user} />
						)}
					</div>

					{/* Mobile Menu Toggle */}
					<button
						className="lg:hidden p-2 text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? <TbX size={28} /> : <TbMenu2 size={28} />}
					</button>
				</div>
			</div>

			{/* Mobile Navigation Overlay */}
			{isMenuOpen && (
				<div className="lg:hidden absolute top-full left-0 w-full bg-[#0a0a0b] border-t border-zinc-800 py-8 px-6 flex flex-col gap-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
					<div className="flex flex-col gap-4">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href as Route}
								onClick={() => setIsMenuOpen(false)}
								className="text-2xl font-semibold text-zinc-200 hover:text-primary-400 transition-colors"
							>
								{link.name}
							</Link>
						))}
					</div>
					<hr className="border-zinc-800" />
					<div className="flex flex-col gap-4 sm:hidden">
						{!user ? (
							<>
								<Link
									href="/auth/signup"
									onClick={() => setIsMenuOpen(false)}
								>
									<Button className="w-full bg-primary-600 h-14 text-lg font-bold">
										Sign Up
									</Button>
								</Link>
								<Link
									href="/auth/login"
									onClick={() => setIsMenuOpen(false)}
								>
									<Button
										variant="outline"
										className="w-full border-primary-600 text-primary-500 h-14 text-lg font-bold"
									>
										Login
									</Button>
								</Link>
							</>
						) : (
							<div className="flex items-center gap-4 p-4 bg-zinc-900 rounded-2xl">
								<Avatar size="lg">
									<Avatar.Image src={user.image} />
								</Avatar>
								<div className="flex flex-col">
									<span className="font-bold text-lg">{user.name}</span>
									<Link
										href="/dashboard"
										onClick={() => setIsMenuOpen(false)}
										className="text-primary-400 text-sm"
									>
										Go to Dashboard
									</Link>
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</nav>
	);
};

// Helper Component for the User Menu
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserDropdown = ({ user }: { user: any }) => (
	<Dropdown>
		<Dropdown.Trigger>
			<Avatar className="cursor-pointer">
				<Avatar.Image
					src={user.image}
					alt="User Image"
					referrerPolicy="no-referrer"
				/>
			</Avatar>
		</Dropdown.Trigger>
		<Dropdown.Popover className="bg-[#151417] rounded-2xl">
			<Dropdown.Menu>
				{user.role !== "ADMIN" && (
					<Dropdown.Item
						textValue="Profile"
						href={`/dashboard${user.role !== "STUDENT" ? `/${user.role.toLowerCase()}` : ""}/profile`}
						className="text-base hover:bg-zinc-800 transition-colors duration-200 rounded-xl"
					>
						Profile
					</Dropdown.Item>
				)}
				<Dropdown.Item
					textValue="Dashboard"
					href={`/dashboard${user.role !== "STUDENT" ? `/${user.role.toLowerCase()}` : ""}`}
					className="text-base hover:bg-zinc-800 transition-colors duration-200 rounded-xl"
				>
					Dashboard
				</Dropdown.Item>
				<Logout />
			</Dropdown.Menu>
		</Dropdown.Popover>
	</Dropdown>
);
