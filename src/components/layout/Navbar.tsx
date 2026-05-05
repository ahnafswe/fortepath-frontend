import Image from "next/image";
import Link from "next/link";
import { Avatar, Button, Dropdown } from "@heroui/react";
import { getServerSession } from "@/lib/utils";
import { Logout } from "./Logout";
import { MobileMenu } from "./MobileMenu";
import { Route } from "next";

export const Navbar = async () => {
	const sessionData = await getServerSession();
	const user = sessionData?.user;

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
				<Link href="/">
					<div className="flex items-center gap-2 md:gap-3 group">
						<Image
							src="/logo.png"
							alt="Logo"
							width={32}
							height={32}
							className="md:size-10"
						/>
						<h3 className="text-xl md:text-3xl font-bold tracking-wide group-hover:text-primary-300">
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
							className="px-3 py-1.5 rounded-lg hover:text-primary-400 hover:bg-primary-900/20"
						>
							{link.name}
						</Link>
					))}
				</div>

				{/* Auth / User Section */}
				<div className="flex items-center gap-2 md:gap-3">
					{!user ? (
						<div className="hidden sm:flex items-center gap-2 md:gap-3">
							<Link href="/auth/signup">
								<Button
									variant="primary"
									className="bg-primary-600 text-sm md:text-[17px] h-9 md:h-11 transition-all duration-200"
								>
									Sign Up
								</Button>
							</Link>
							<Link href="/auth/login">
								<Button
									variant="outline"
									className="border-primary-600 text-primary-500 text-sm md:text-[17px] h-9 md:h-11 transition-all duration-200"
								>
									Login
								</Button>
							</Link>
						</div>
					) : (
						<Dropdown>
							<Dropdown.Trigger>
								<Avatar className="cursor-pointer">
									{/* USER IMAGE RESTORED */}
									<Avatar.Image
										src={user.image}
										alt="User"
										referrerPolicy="no-referrer"
									/>
								</Avatar>
							</Dropdown.Trigger>
							<Dropdown.Popover className="bg-[#151417] rounded-2xl">
								<Dropdown.Menu>
									{user.role !== "ADMIN" && (
										<Dropdown.Item
											href={`/dashboard${user.role !== "STUDENT" ? `/${user.role.toLowerCase()}` : ""}/profile`}
										>
											Profile
										</Dropdown.Item>
									)}
									<Dropdown.Item
										href={`/dashboard${user.role !== "STUDENT" ? `/${user.role.toLowerCase()}` : ""}`}
									>
										Dashboard
									</Dropdown.Item>
									<Logout />
								</Dropdown.Menu>
							</Dropdown.Popover>
						</Dropdown>
					)}

					{/* The Mobile Component we made */}
					<MobileMenu
						user={user}
						links={navLinks}
					/>
				</div>
			</div>
		</nav>
	);
};
