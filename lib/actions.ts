"use server";
import { revalidatePath } from "next/cache";
import prisma from "./db";

export async function createBudget(formData: FormData) {
	try {
		await prisma.budgets.create({
			data: {
				name: formData.get("name") as string,
				amount: formData.get("amount") as string,
				createdBy: formData.get("createdBy") as string,
				icon: formData.get("icon") as string,
			},
		});
		revalidatePath("/dashboard/budgets");
		return { success: true };
	} catch (error) {
		console.error(error);
		return { success: false, error: error };
	}
}

export async function editBudget(formData: FormData, id: number) {
	await prisma.budgets.update({
		where: { id },
		data: {
			name: formData.get("name") as string,
			amount: formData.get("amount") as string,
			createdBy: formData.get("createdBy") as string,
			icon: formData.get("icon") as string,
		},
	});
}

export async function deleteBudget(id: number) {
	await prisma.budgets.delete({
		where: { id },
	});
}

// EXPENSE ACTIONS

export async function createExpense(formData: FormData, id: number) {
	try {
		await prisma.expenses.create({
			data: {
				name: formData.get("name") as string,
				amount: formData.get("amount") as string,
				budgetId: id,
			},
		});
		return { success: true };
	} catch (error) {
		console.error(error);
		return { success: false, error: error };
	}
}
