import { LucideIcon } from "lucide-react";

type MenuList = {
	id: number;
	name: string;
	icon: LucideIcon;
	path: string;
};

type Expenses = {
	id: number;
	name: string;
	amount: string;
	budgetId: number;
	budgets: Budgets[];
};

type Budgets = {
	id: number;
	name: string;
	amount: string;
	icon: string;
	createdBy: string;
	expenses: Expenses[];
};

type Expense = {
	name: string;
	amount: string;
};
