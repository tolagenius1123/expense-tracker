"use client";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
	const { isSignedIn } = useUser();

	return (
		<div className="p-5 flex justify-between items-center border shadow-sm">
			<h2 className="text-4xl text-primary font-bold">Logo</h2>
			{isSignedIn ? (
				<UserButton />
			) : (
				<Link href="/dashboard">
					<Button className="bg-primary">Get Started</Button>
				</Link>
			)}
		</div>
	);
}
