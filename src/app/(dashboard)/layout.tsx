import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { StudentSidebar } from "@/components/layout/StudentSidebar";
import { TutorSidebar } from "@/components/layout/TutorSidebar";
import { getServerSession } from "@/lib/utils";
import { ReactNode } from "react";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
	// Get user and session
	const sessionData = await getServerSession();
	const user = sessionData.user;
	return (
		<div className="flex">
			{user.role === "STUDENT" && <StudentSidebar />}
			{user.role === "TUTOR" && <TutorSidebar />}
			{user.role === "ADMIN" && <AdminSidebar />}
			<div className="flex-1 pb-16 lg:pb-0">{children}</div>
		</div>
	);
}
