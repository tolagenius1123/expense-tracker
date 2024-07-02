import prisma from "@/lib/db";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";

export default async function Expenses({ params }: Params) {
	const budgetInfo = await prisma.budgets.findUnique({
		where: {
			id: parseInt(params.id),
		},
		include: {
			expenses: {
				select: {
					amount: true,
					id: true,
				},
			},
		},
	});

	// const totalSpend = budgets?.expenses.reduce((acc, expense) => acc + expense.amount, 0) ?? 0;
	const totalItem = budgetInfo?.expenses.length ?? 0;
	console.log(budgetInfo);

	return (
		<div className="p-10">
			<h2 className="text-2xl font-bold">My Expenses</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
				<BudgetItem budget={budgetInfo} />
				<AddExpense budgetId={params.id} />
			</div>
		</div>
	);
}
