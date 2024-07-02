"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { createExpense } from "@/lib/actions";
import { ChangeEvent, FormEvent, useState } from "react";

export default function AddExpense({ budgetId }: { budgetId: string }) {
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		if (!formData.get("name") && !formData.get("amount")) {
			toast({
				description: `All fields are required`,
				variant: "destructive",
			});
			return;
		}

		const response = await createExpense(formData, parseInt(budgetId));

		if (response?.success) {
			toast({
				title: "Expense Created",
				description: "Your new Expense has been successfully created.",
				variant: "custom",
			});
		} else {
			toast({
				title: "Error",
				description: `Failed to create budget: ${response.error}`,
				variant: "destructive",
			});
		}
	};

	return (
		<div className="border p-5 rounded-lg">
			<h2 className="font-bold text-lg">Add Expense</h2>
			<form onSubmit={handleSubmit}>
				<div className="mt-2 ">
					<h2 className="text-black font-medium my-1">
						Expense Name
					</h2>
					<Input placeholder="e.g. Home Decor" name="name" />
				</div>
				<div className="mt-2 ">
					<h2 className="text-black font-medium my-1">
						Expense Amount
					</h2>
					<Input placeholder="e.g. $5000" name="amount" />
				</div>
				<Button className="mt-5 w-full" type="submit">
					Create Expense
				</Button>
			</form>
		</div>
	);
}
