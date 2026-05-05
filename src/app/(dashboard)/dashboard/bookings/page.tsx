import { TableHeader } from "@/components/shared/TableHeader";
import { getServerSession } from "@/lib/utils";
import { cookies } from "next/headers";
import Image from "next/image";
import { TbCalendarTime, TbNotes, TbUserShare } from "react-icons/tb";

type Booking = {
	id: string;
	tutor: {
		name: string;
		image?: string;
		email: string;
	};
	topic: string;
	dueTime: string;
	duration: number;
	status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
	notes?: string;
	createdAt: string;
};

const StudentBookings = async () => {
	const cookieStore = cookies();
	const sessionData = await getServerSession();
	const user = await sessionData.user;

	const bookingsRes = await fetch(
		`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/bookings?studentId=${user?.id}`,
		{
			headers: {
				Cookie: (await cookieStore).toString(),
			},
			cache: "no-store",
		},
	);
	const { total: totalBookings, data: bookings } = await bookingsRes.json();

	return (
		<div className="p-4 md:p-8 flex-1 min-h-screen">
			{/* Header Area */}
			<div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-2">
				<h2 className="text-3xl md:text-4xl font-bold text-primary-200">
					Your Bookings
				</h2>
				<p className="text-zinc-400 text-sm md:text-base">
					Total{" "}
					<span className="text-primary-400 font-semibold">{totalBookings}</span>{" "}
					sessions booked
				</p>
			</div>

			{bookings.length > 0 ? (
				<div className="w-full">
					{/* Responsive Container */}
					<div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
						{/* Mobile & Tablet View: Booking Cards */}
						<div className="block lg:hidden divide-y divide-zinc-800">
							{bookings.map((booking: Booking) => (
								<div
									key={booking.id}
									className="p-5 space-y-4"
								>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											{booking.tutor.image ? (
												<Image
													src={booking.tutor.image}
													alt={booking.tutor.name}
													width={32}
													height={32}
													className="rounded-full border border-primary-900/50"
												/>
											) : (
												<div className="size-8 rounded-full bg-zinc-800 flex items-center justify-center">
													<TbUserShare className="text-zinc-500" />
												</div>
											)}
											<span className="font-semibold text-zinc-200">
												{booking.tutor.name}
											</span>
										</div>
										<span
											className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
												booking.status === "CONFIRMED"
													? "bg-yellow-900/30 text-yellow-500"
													: booking.status === "COMPLETED"
														? "bg-green-900/30 text-green-500"
														: "bg-red-900/30 text-red-500"
											}`}
										>
											{booking.status.toLowerCase()}
										</span>
									</div>

									<div className="grid grid-cols-2 gap-3 text-xs">
										<div className="flex items-center gap-2 text-zinc-400">
											<TbCalendarTime className="text-primary-500" />
											<span>
												{new Date(booking.dueTime).toLocaleDateString()}
											</span>
										</div>
										<div className="flex items-center gap-2 text-zinc-400">
											<TbNotes className="text-primary-500" />
											<span className="truncate">{booking.topic}</span>
										</div>
									</div>

									{booking.notes && (
										<p className="text-xs text-zinc-500 italic bg-zinc-800/20 p-2 rounded-lg line-clamp-2">
											&ldquo;{booking.notes}&rdquo;
										</p>
									)}
								</div>
							))}
						</div>

						{/* Laptop & Desktop View: Traditional Table */}
						<div className="hidden lg:flex flex-col cursor-default">
							<TableHeader
								cols={[
									"Tutor",
									"Topic",
									"Due Time",
									"Duration",
									"Status",
									"Notes",
									"Booked At",
								]}
							/>
							{bookings.map((booking: Booking, idx: number) => {
								const statusColor =
									booking.status === "CONFIRMED"
										? "text-yellow-500"
										: booking.status === "COMPLETED"
											? "text-green-500"
											: "text-red-500";

								return (
									<div
										key={booking.id}
										className={`${idx % 2 === 0 ? "bg-zinc-900/50" : "bg-zinc-900/65"} flex items-center py-4 text-center transition hover:bg-primary-900/10`}
									>
										<div
											className="px-2 flex items-center justify-center gap-2 flex-1 min-w-0"
											title={booking.tutor.email}
										>
											{booking.tutor.image && (
												<Image
													src={booking.tutor.image}
													alt=""
													width={24}
													height={24}
													className="size-6 rounded-full"
												/>
											)}
											<span className="truncate text-sm font-medium">
												{booking.tutor.name}
											</span>
										</div>
										<div className="px-2 flex-1 text-sm truncate">
											{booking.topic}
										</div>
										<div className="px-2 flex-1 text-sm text-zinc-300">
											{new Date(booking.dueTime).toLocaleString([], {
												dateStyle: "short",
												timeStyle: "short",
											})}
										</div>
										<div className="px-2 flex-1 text-sm">
											{booking.duration} mins
										</div>
										<div
											className={`px-2 flex-1 text-xs font-bold uppercase ${statusColor}`}
										>
											{booking.status.toLowerCase()}
										</div>
										<div
											className="px-2 flex-1 text-xs text-zinc-500 italic truncate"
											title={booking.notes}
										>
											{booking.notes || "—"}
										</div>
										<div className="px-2 flex-1 text-sm text-zinc-500">
											{new Date(booking.createdAt).toLocaleDateString()}
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center h-[60vh] border-2 border-dashed border-zinc-800 rounded-3xl text-center px-4">
					<p className="text-zinc-500 text-lg md:text-xl font-medium">
						You haven&apos;t made any bookings yet.
					</p>
					<p className="text-zinc-600 text-sm mt-2">
						Browse our expert tutors to start your journey.
					</p>
				</div>
			)}
		</div>
	);
};

export default StudentBookings;
