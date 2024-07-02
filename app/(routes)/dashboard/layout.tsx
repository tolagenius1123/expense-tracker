import DashboardHeader from "./_components/DashboardHeader";
import Sidebar from "./_components/Sidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<div className="fixed md:w-64 hidden md:block">
				<Sidebar />
			</div>
			<div className="md:ml-64 border-2">
				<DashboardHeader />
				<div className="overflow-y-scroll">{children}</div>
			</div>
		</div>
	);
}
