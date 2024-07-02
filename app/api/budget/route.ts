import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { name, amount, createdBy, emojiIcon } = await req.json();

	try {
		const result = await prisma.budgets.create({
			data: {
				name: name,
				amount: amount,
				createdBy: createdBy,
				icon: emojiIcon,
			},
		});
		return NextResponse.json(result, { status: 201 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(error, { status: 500 });
	}
}

export async function GET(req: NextRequest) {
	try {
		const result = await prisma.budgets.findMany();
		return NextResponse.json(result, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(error, { status: 500 });
	}
}

// export async function POST(req: NextRequest) {
// 	const { name, amount, user, emojiIcon } = await req.json();
// 	return NextResponse.json(
// 		{ name, amount, user, emojiIcon },
// 		{ status: 201 }
// 	);
// }
