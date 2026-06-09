import { NextResponse } from "next/server";
import { mockCases } from "@/features/cases/data/mockCases";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();


export async function GET() {
  const cases = await prisma.case.findMany({
    orderBy: {
      sortOrder: "asc",
    },
  });
  return NextResponse.json(cases);
}

export async function POST(
    request: Request,
){
    const cases = await request.json();

    // console.log(cases);
    
    return NextResponse.json({
        success: true,
    })
}