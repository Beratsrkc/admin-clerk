import { NextRequest, NextResponse } from "next/server";
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient

export async function GET(request: NextRequest) {
    try {
        const categories = await prisma.category.findMany();
        return NextResponse.json(categories, {status:200});
    } catch (error) {
        return NextResponse.json({error:"Failed"}, {status:500});

    }
}

export async function POST(request: NextRequest) {

    const {title, description}=await request.json();
    try {
        const newCategory = await prisma.category.create({data:{title, description}})
        return NextResponse.json(newCategory, {status:200});
    } catch (error) {
        return NextResponse.json({error:"Failed"}, {status:500});
    }
    
}

