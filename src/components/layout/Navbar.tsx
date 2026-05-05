import Image from "next/image";
import Link from "next/link";
import { Avatar, Button, Dropdown } from "@heroui/react";
import { getServerSession } from "@/lib/utils";
import { Logout } from "./Logout";

export const Navbar = async () => {
	const sessionData = await getServerSession();
	const user = sessionData?.user;

	return (
		<nav className="bg-background/75 backdrop-blur-md fixed top-0 left-0 w-full px-6 md:px-12 lg:px-24 xl:px-48 2xl:px-80 py-4 shadow-md shadow-black/7.5 z-50">
			<div className="flex items-center justify-between">
				{/* Logo */}
				<Link href="/">
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

				{/* Desktop Links - Hidden on mobile/tablet */}
				<div className="hidden lg:flex items-center gap-3 text-lg">
					<Link
						href="/"
						className="px-3 py-1.5 rounded-lg hover:text-primary-400 hover:bg-primary-900/20 transition-colors duration-250"
					>
						Home
					</Link>
					<Link
						href="/tutors"
						className="px-3 py-1.5 rounded-lg hover:text-primary-400 hover:bg-primary-900/20 transition-colors duration-250"
					>
						Tutors
					</Link>
					<Link
						href="/categories"
						className="px-3 py-1.5 rounded-lg hover:text-primary-400 hover:bg-primary-900/20 transition-colors duration-250"
					>
						Categories
					</Link>
				</div>

				{/* Auth Buttons / User */}
				<div className="flex items-center gap-2 md:gap-3">
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
							<Link
								href="/auth/login"
								className="hidden sm:block"
							>
								<Button
									variant="outline"
									className="border-primary-600 text-primary-500 text-sm md:text-[17px] h-9 md:h-12 transition-all duration-200"
								>
									Login
								</Button>
							</Link>
						</>
					) : (
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
					)}
				</div>
			</div>
		</nav>
	);
};
