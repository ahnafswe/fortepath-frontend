import { TableHeader } from "@/components/shared/TableHeader";
import { getServerSession } from "@/lib/utils";
import { cookies } from "next/headers";
import Image from "next/image";

type Session = {
	id: string;
	student: {
		name: string;
		image?: string;
		email: string;
	};
	topic: string;
	dueTime: string;
	duration: string;
	status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
	notes?: string;
};

const TutorSessions = async () => {
	// Get cookie store
	const cookieStore = cookies();

	// Fetch current user
	const sessionData = await getServerSession();
	const user = await sessionData.user;

	// Fetch and parse tutor's bookings
	const sessionsRes = await fetch(
		`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/bookings?tutorId=${user?.id}`,
		{
			headers: {
				Cookie: (await cookieStore).toString(),
			},
			cache: "no-store",
		},
	);
	const { total: totalSessions, data: sessions } = await sessionsRes.json();

	return (
		<div className="p-8 flex-1">
			{/* Header */}
			<h2 className="text-4xl font-bold text-primary-200 mb-8">Your Sessions</h2>
			{sessions.length > 0 ? (
				<>
					{/* Bookings Count */}
					<p className="text-center text-zinc-300/75 mb-2">
						Showing total {totalSessions} session{totalSessions > 1 && "s"}
					</p>
					{/* Bookings Table */}
					<div className="w-full flex flex-col cursor-default">
						<TableHeader
							cols={[
								"Student",
								"Topic",
								"Due Time",
								"Duration",
								"Status",
								"Notes",
							]}
						/>
						{sessions.map((session: Session, idx: number) => {
							// Status text color
							const statusColor =
								session.status === "CONFIRMED"
									? "text-yellow-500"
									: session.status === "COMPLETED"
										? "text-green-500"
										: "text-red-500";

							return (
								<div
									key={session.id}
									className={`${idx % 2 === 0 ? "bg-zinc-900/50" : "bg-zinc-900/65"} flex items-center py-3 text-center ${idx === totalSessions - 1 && "rounded-b-2xl"}`}
								>
									{/* Student */}
									<div
										className="px-2 flex items-center justify-center gap-x-2 flex-1"
										title={session.student.email}
									>
										{session.student.image && (
											<Image
												src={session.student.image}
												alt=""
												width={24}
												height={24}
												className="size-6 rounded-full"
											/>
										)}
										<span className="line-clamp-1">
											{session.student.name}
										</span>
									</div>
									{/* Topic */}
									<div className="px-2 flex-1 line-clamp-1">
										{session.topic}
									</div>
									{/* Due Time */}
									<div className="px-2 flex-1 line-clamp-1">
										{new Date(session.dueTime).toLocaleString()}
									</div>
									{/* Duration */}
									<div className="px-2 flex-1 line-clamp-1">
										{session.duration} mins
									</div>
									{/* Status */}
									<div
										className={`px-2 flex-1 line-clamp-1 capitalize ${statusColor}`}
									>
										{session.status.toLowerCase()}
									</div>
									{/* Notes */}
									<div className="px-2 flex-1 line-clamp-1">
										{session.notes}
									</div>
								</div>
							);
						})}
					</div>
				</>
			) : (
				<div className="flex flex-col justify-center h-[66vh]">
					<p className="text-center text-zinc-400 text-xl">
						You have no upcoming or past sessions.
					</p>
				</div>
			)}
		</div>
	);
};

export default TutorSessions;
