"use client";
import { cn } from "@/lib/utils";
import { MenuList } from "@/types";
import { UserButton } from "@clerk/nextjs";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
	const pathname = usePathname();

	const menuList: MenuList[] = [
		{
			id: 1,
			name: "Dashboard",
			icon: LayoutGrid,
			path: "/dashboard",
		},
		{
			id: 2,
			name: "Budget",
			icon: PiggyBank,
			path: "/dashboard/budgets",
		},
		{
			id: 3,
			name: "Expenses",
			icon: ReceiptText,
			path: "/dashboard/expenses",
		},
		{
			id: 4,
			name: "Upgrade",
			icon: ShieldCheck,
			path: "/dashboard/upgrade",
		},
	];

	return (
		<div className="h-screen p-5 border shadow-sm">
			<h2 className="text-3xl text-primary font-bold">ExpTracker</h2>
			<div className="mt-5">
				{menuList.map((menu) => (
					<Link
						key={menu.id}
						href={menu.path}
						className={cn(
							"flex items-center gap-2 text-gray-500 font-medium py-4 px-5 cursor-pointer rounded-md hover:text-primary hover:bg-blue-100 mb-1",
							pathname === menu.path && "text-primary bg-blue-100"
						)}
					>
						<menu.icon />
						{menu.name}
					</Link>
				))}
			</div>
			<div className="fixed bottom-10 p-5 flex gap-2 items-center">
				<UserButton /> Profile
			</div>
		</div>
	);
}
