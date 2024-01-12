import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/authOptions";

// TODO: add status patch request

export async function PATCH(request: NextRequest, 
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);
    if(!session)
        return NextResponse.json({},{ status: 401 }); // unauthorized

    const body = await request.json();

    const validation = patchIssueSchema.safeParse(body);

    if(!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 }); // bad request

    const { title, description, assignedUserId } = body;

    if(assignedUserId) {
        const user = await prisma.user.findUnique({
            where: { id: assignedUserId }
        });
        if(!user)
            return NextResponse.json({ error: 'Invalid user.'}, { status: 400 }); // bad request
    };

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    });

    if(!issue)
        return NextResponse.json({ error: 'Issue not found.' },{ status: 404 }); // not found

    const updatedIssue = await prisma.issue.update({
        where: {
            id: issue.id
        },
        data: {
            title,
            description,
            assignedUserId
        }
    });

    return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest,
    { params }: { params: { id: string } }
) {

    const session = await getServerSession(authOptions);
    if(!session)
        return NextResponse.json({},{ status: 401 }); // unauthorized

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    });
    if(!issue)
        return NextResponse.json({ error: 'Issue not found.' }, { status: 404 });
    await prisma.issue.delete({
        where: {
            id: issue.id
        }
    });
    return NextResponse.json({});
}