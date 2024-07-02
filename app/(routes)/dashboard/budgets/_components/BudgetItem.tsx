// import { Budgets } from "@/types";

import { Budgets } from "@prisma/client";
import Link from "next/link";

type BudgetItemProps = {
	budget: any;
};

export default function BudgetItem({ budget }: BudgetItemProps) {
	return (
		<Link
			href={`/dashboard/expenses/${budget.id}`}
			className="p-5 border rounded-lg gap-2 hover:shadow-md cursor-pointer h-[170px]"
		>
			<div className="flex items-center justify-between">
				<div className="flex gap-2 items-center">
					<h2 className="text-3xl p-2 bg-slate-100 rounded-full">
						{budget?.icon}
					</h2>
					<div className="">
						<h2 className="font-bold">{budget.name}</h2>
						{/* <h2 className="text-sm text-gray-400">{budget.expenses.length} Item</h2> */}
					</div>
				</div>
				<h2 className="font-bold text-primary text-lg">
					${budget.amount}
				</h2>
			</div>
			<div className="mt-5">
				<div className="flex items-center justify-between mb-3">
					<h2 className="text-xs text-slate-400">$0 Spent</h2>
					<h2 className="text-xs text-slate-400">$2000 Remaining</h2>
				</div>
				<div className="w-full bg-slate-300 h-2 rounded-full">
					<div className="w-[40%] bg-primary h-2 rounded-full"></div>
				</div>
			</div>
		</Link>
	);
}
