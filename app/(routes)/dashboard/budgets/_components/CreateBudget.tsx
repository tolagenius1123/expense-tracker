"use client";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { createBudget } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { DialogClose } from "@radix-ui/react-dialog";
import EmojiPicker from "emoji-picker-react";

export default function CreateBudget() {
	const [emojiIcon, setEmojiIcon] = useState("🚀");
	const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

	const { user } = useUser();
	const createdBy = user?.primaryEmailAddress?.emailAddress || "";

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

		const response = await createBudget(formData);

		if (response?.success) {
			toast({
				title: "Budget Created",
				description: "Your new budget has been successfully created.",
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
		<div className="">
			<Dialog>
				<DialogTrigger asChild>
					<div className="bg-slate-100 p-10 rounded-md flex items-center flex-col border-2 border-dashed cursor-pointer hover:shadow-md">
						<h2 className="text-3xl">+</h2>
						<h2 className="">Create New Budget</h2>
					</div>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create New Budget</DialogTitle>
						<DialogDescription>
							{/* <form action={createBudget} className="mt-5"> */}
							<form onSubmit={handleSubmit} className="mt-5">
								<Button
									variant="outline"
									className="text-2xl"
									name="icon"
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										setOpenEmojiPicker((prev) => !prev);
									}}
								>
									{emojiIcon}
								</Button>
								{openEmojiPicker && (
									<div
										className="absolute z-10"
										onClick={(e) => {
											e.stopPropagation();
											e.preventDefault();
										}}
									>
										<EmojiPicker
											onEmojiClick={(e) => {
												setEmojiIcon(e.emoji);
												setOpenEmojiPicker(false);
											}}
										/>
									</div>
								)}
								<input
									type="hidden"
									name="icon"
									value={emojiIcon}
								/>
								<div className="mt-2 ">
									<h2 className="text-black font-medium my-1">
										Budget Name
									</h2>
									<Input
										placeholder="e.g. Home Decor"
										name="name"
									/>
								</div>
								<div className="mt-2 ">
									<h2 className="text-black font-medium my-1">
										Budget Amount
									</h2>
									<Input
										placeholder="e.g. $5000"
										name="amount"
									/>
								</div>
								<input
									type="hidden"
									name="createdBy"
									value={createdBy}
								/>
								<DialogClose asChild>
									<Button
										className="mt-5 w-full"
										type="submit"
									>
										Create Budget
									</Button>
								</DialogClose>
							</form>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
}
