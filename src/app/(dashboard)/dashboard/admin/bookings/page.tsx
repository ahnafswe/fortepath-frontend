import { TableHeader } from "@/components/shared/TableHeader";
import { Avatar } from "@heroui/react";
import { cookies } from "next/headers";
import { TbLoader2, TbArrowRight } from "react-icons/tb";

type Booking = {
	id: string;
	topic: string;
	dueTime: string;
	duration: number;
	notes?: string;
	status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
	createdAt: string;
	tutor: {
		name: string;
		image: string;
		email: string;
	};
	student: {
		name: string;
		image: string;
		email: string;
	};
};

const AdminBookings = async () => {
	const cookieStore = cookies();

	const bookingsRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/bookings`, {
		headers: {
			Cookie: (await cookieStore).toString(),
		},
		cache: "no-store",
	});
	const { total: totalBookings, data: bookings } = await bookingsRes.json();

	return (
		<div className="p-4 md:p-8 flex-1 min-h-screen">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-2">
				<h2 className="text-3xl md:text-4xl font-bold text-primary-200">Bookings</h2>
				<p className="text-zinc-400 text-sm md:text-base">
					Total{" "}
					<span className="text-primary-400 font-semibold">{totalBookings}</span>{" "}
					sessions booked
				</p>
			</div>

			{bookings ? (
				bookings.length > 0 ? (
					<div className="w-full">
						<div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
							{/* Mobile & Tablet View: Rich Cards */}
							<div className="block xl:hidden divide-y divide-zinc-800">
								{bookings.map((booking: Booking) => (
									<div
										key={booking.id}
										className="p-5 space-y-4"
									>
										<div className="flex items-center justify-between">
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
											<span className="text-xs text-zinc-500">
												{new Date(booking.dueTime).toLocaleDateString()}
											</span>
										</div>

										<div className="flex items-center justify-center gap-3 bg-zinc-800/30 py-3 rounded-xl">
											<div className="flex flex-col items-center gap-1">
												<Avatar size="sm">
													<Avatar.Image src={booking.student.image} />
												</Avatar>
												<span className="text-[10px] text-zinc-400 truncate w-16 text-center">
													{booking.student.name}
												</span>
											</div>
											<TbArrowRight className="text-zinc-600" />
											<div className="flex flex-col items-center gap-1">
												<Avatar size="sm">
													<Avatar.Image src={booking.tutor.image} />
												</Avatar>
												<span className="text-[10px] text-zinc-400 truncate w-16 text-center">
													{booking.tutor.name}
												</span>
											</div>
										</div>

										<div className="space-y-1">
											<h4 className="text-sm font-semibold text-zinc-200 line-clamp-1">
												{booking.topic}
											</h4>
											<p className="text-xs text-zinc-500 line-clamp-2 italic">
												Note: {booking.notes || "N/A"}
											</p>
										</div>
									</div>
								))}
							</div>

							{/* Laptop & Desktop View: Expanded Table */}
							<div className="hidden xl:flex flex-col cursor-default">
								<TableHeader
									cols={[
										"Student",
										"Tutor",
										"Topic",
										"Due Date",
										"Duration",
										"Status",
										"Notes",
										"Booked On",
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
											<div className="px-2 flex items-center justify-center gap-2 flex-1 min-w-0">
												<Avatar size="sm">
													<Avatar.Image src={booking.student.image} />
												</Avatar>
												<span className="truncate text-sm">
													{booking.student.name}
												</span>
											</div>
											<div className="px-2 flex items-center justify-center gap-2 flex-1 min-w-0">
												<Avatar size="sm">
													<Avatar.Image src={booking.tutor.image} />
												</Avatar>
												<span className="truncate text-sm">
													{booking.tutor.name}
												</span>
											</div>
											<div className="px-2 flex-1 text-sm truncate">
												{booking.topic}
											</div>
											<div className="px-2 flex-1 text-sm">
												{new Date(booking.dueTime).toLocaleDateString()}
											</div>
											<div className="px-2 flex-1 text-sm">
												{booking.duration}m
											</div>
											<div
												className={`px-2 flex-1 text-xs font-bold uppercase ${statusColor}`}
											>
												{booking.status.toLowerCase()}
											</div>
											<div
												className="px-2 flex-1 text-xs text-zinc-500 truncate italic"
												title={booking.notes}
											>
												{booking.notes || "—"}
											</div>
											<div className="px-2 flex-1 text-sm text-zinc-400">
												{new Date(
													booking.createdAt,
												).toLocaleDateString()}
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				) : (
					<div className="flex flex-col items-center justify-center h-[60vh] border-2 border-dashed border-zinc-800 rounded-3xl">
						<p className="text-zinc-500 text-xl font-medium">
							No bookings have been made yet.
						</p>
					</div>
				)
			) : (
				<div className="flex items-center justify-center h-64">
					<TbLoader2
						size={48}
						className="text-primary-600 animate-spin"
					/>
				</div>
			)}
		</div>
	);
};

export default AdminBookings;
