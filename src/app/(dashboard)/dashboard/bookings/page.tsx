import { TableHeader } from "@/components/shared/TableHeader";
import { getServerSession } from "@/lib/utils";
import { cookies } from "next/headers";
import Image from "next/image";

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
	// Get cookie store
	const cookieStore = cookies();

	// Fetch current user
	const sessionData = await getServerSession();
	const user = await sessionData.user;

	// Fetch and parse student's bookings
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
		<div className="p-8 flex-1">
			{/* Header */}
			<h2 className="text-4xl font-bold text-primary-200 mb-8">Your Bookings</h2>
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
									{/* Tutor */}
									<div
										className="px-2 flex items-center justify-center gap-x-2 flex-1"
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
										<span className="line-clamp-1">
											{booking.tutor.name}
										</span>
									</div>
									{/* Topic */}
									<div className="px-2 flex-1 line-clamp-1">
										{booking.topic}
									</div>
									{/* Due Time */}
									<div className="px-2 flex-1 line-clamp-1">
										{new Date(booking.dueTime).toLocaleString()}
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
									{/* Booked At */}
									<div className="px-2 flex-1 line-clamp-1">
										{new Date(booking.createdAt).toLocaleString()}
									</div>
								</div>
							);
						})}
					</div>
				</>
			) : (
				<div className="flex flex-col justify-center h-[66vh]">
					<p className="text-center text-zinc-400 text-xl">
						You&apos;ve made no bookings yet.
					</p>
				</div>
			)}
		</div>
	);
};

export default StudentBookings;
