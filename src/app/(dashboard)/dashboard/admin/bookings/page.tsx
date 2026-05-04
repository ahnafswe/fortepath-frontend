import { TableHeader } from "@/components/shared/TableHeader";
import { Avatar } from "@heroui/react";
import { cookies } from "next/headers";

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
	// Get cookie store
	const cookieStore = cookies();

	// Fetch and parse bookings
	const bookingsRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/bookings`, {
		headers: {
			Cookie: (await cookieStore).toString(),
		},
		cache: "no-store",
	});
	const { total: totalBookings, data: bookings } = await bookingsRes.json();

	return (
		<div className="p-8 flex-1">
			{/* Header */}
			<h2 className="text-4xl font-bold text-primary-200 mb-8">Bookings</h2>
			{bookings.length > 0 ? (
				<>
					{/* Bookings Count */}
					<p className="text-center text-zinc-300/75 mb-2">
						Showing total {totalBookings} booking{totalBookings > 1 && "s"}
					</p>
					{/* Bookings Table */}
					<div className="w-full flex flex-col cursor-default">
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
							// Status text color
							const statusColor =
								booking.status === "CONFIRMED"
									? "text-yellow-500"
									: booking.status === "COMPLETED"
										? "text-green-500"
										: "text-red-500";
							return (
								<div
									key={booking.id}
									className={`${idx % 2 === 0 ? "bg-zinc-900/50" : "bg-zinc-900/65"} flex items-center py-3 text-center ${idx === totalBookings - 1 && "rounded-b-2xl"}`}
								>
									{/* Student */}
									<div
										className="px-2 flex items-center justify-center gap-x-2 flex-1"
										title={booking.student.email}
									>
										{booking.student.image && (
											<Avatar size="sm">
												<Avatar.Image src={booking.student.image} />
											</Avatar>
										)}
										<span className="line-clamp-1">
											{booking.student.name}
										</span>
									</div>
									{/* Tutor */}
									<div
										className="px-2 flex items-center justify-center gap-x-2 flex-1"
										title={booking.tutor.email}
									>
										{booking.tutor.image && (
											<Avatar size="sm">
												<Avatar.Image src={booking.tutor.image} />
											</Avatar>
										)}
										<span className="line-clamp-1">
											{booking.tutor.name}
										</span>
									</div>
									{/* Topic */}
									<div className="px-2 flex-1 line-clamp-1">
										{booking.topic}
									</div>
									{/* Due Date */}
									<div
										className="px-2 flex-1 line-clamp-1"
										title={new Date(booking.dueTime).toLocaleString()}
									>
										{new Date(booking.dueTime).toLocaleDateString()}
									</div>
									{/* Duration */}
									<div className="px-2 flex-1 line-clamp-1">
										{booking.duration} mins
									</div>
									{/* Status */}
									<div
										className={`px-2 flex-1 line-clamp-1 capitalize ${statusColor}`}
									>
										{booking.status.toLowerCase()}
									</div>
									{/* Notes */}
									<div className="px-2 flex-1 line-clamp-1">
										{booking.notes}
									</div>
									{/* Booked On */}
									<div
										className="px-2 flex-1 line-clamp-1"
										title={new Date(booking.createdAt).toLocaleString()}
									>
										{new Date(booking.createdAt).toLocaleDateString()}
									</div>
								</div>
							);
						})}
					</div>
				</>
			) : (
				<div className="flex flex-col justify-center h-[66vh]">
					<p className="text-center text-zinc-400 text-xl">
						No bookings are made yet.
					</p>
				</div>
			)}
		</div>
	);
};

export default AdminBookings;
