import { NextResponse } from "next/server";
import { mockCases } from "@/features/cases/data/mockCases";

export async function GET() {
    return NextResponse.json(mockCases);
}

