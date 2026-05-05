"use client";

import { useState } from "react";
import { TbMenu2, TbX } from "react-icons/tb";
import Link from "next/link";
import { Button } from "@heroui/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MobileMenu = ({ user, links }: { user: any; links: any[] }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="lg:hidden">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="p-2 text-zinc-100"
			>
				{isOpen ? <TbX size={28} /> : <TbMenu2 size={28} />}
			</button>

			{isOpen && (
				<div className="absolute top-full left-0 w-full bg-background border-t border-zinc-800 py-8 px-6 flex flex-col gap-6 z-50 shadow-2xl">
					<div className="flex flex-col gap-4">
						{links.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								onClick={() => setIsOpen(false)}
								className="text-2xl font-semibold text-zinc-200"
							>
								{link.name}
							</Link>
						))}
					</div>
					{!user && (
						<div className="flex flex-col gap-4 pt-4 border-t border-zinc-800">
							<Link
								href="/auth/signup"
								onClick={() => setIsOpen(false)}
							>
								<Button className="bg-primary-600 h-10 text-sm">Sign Up</Button>
							</Link>
							<Link
								href="/auth/login"
								onClick={() => setIsOpen(false)}
							>
								<Button
									variant="outline"
									className="border-primary-600 text-primary-500 h-10 text-sm"
								>
									Login
								</Button>
							</Link>
						</div>
					)}
				</div>
			)}
		</div>
	);
};
