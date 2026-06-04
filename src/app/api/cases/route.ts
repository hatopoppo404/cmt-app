import { NextResponse } from "next/server";
import { mockCases } from "@/features/cases/data/mockCases";

export async function GET() {
    return NextResponse.json(mockCases);
}

export async function POST(
    request: Request,
){
    const cases = await request.json();

    console.log(cases);
    
    return NextResponse.json({
        success: true,
    })
}