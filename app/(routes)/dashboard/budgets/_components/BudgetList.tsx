import CreateBudget from "./CreateBudget";
import BudgetItem from "./BudgetItem";
import prisma from "@/lib/db";

export default async function BudgetList() {
	const budgets = await prisma.budgets.findMany();

	return (
		<div className="mt-7">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
				<CreateBudget />
				{budgets?.length > 0
					? budgets?.map((budget) => (
							<BudgetItem budget={budget} key={budget.id} />
					  ))
					: [1, 2, 3, 4, 5].map((item, index) => (
							<div
								key={index}
								className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
							></div>
					  ))}
			</div>
		</div>
	);
}
