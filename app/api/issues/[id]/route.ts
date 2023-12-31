import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "@/app/validationSchemas";

export async function PATCH(request: NextRequest, 
    { params }: { params: { id: string } }
) {
    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    if(!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 }); // bad request
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    });
    if(!issue)
        return NextResponse.json({ error: 'Issue not found.' },{ status: 404 }); // not found
    const updatedIssue = await prisma.issue.update({
        where: {
            id: parseInt(params.id)
        },
        data: {
            title: body.title,
            description: body.description

        }
    });
    return NextResponse.json(updatedIssue);
}