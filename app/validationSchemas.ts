import { Status } from '@prisma/client';
import { z } from 'zod';

export const issueSchema = z.object({
    title: z.string().min(1, { message: "Issue title is required." }).max(255),
    description: z.string().min(1, { message: "Description is required." }).max(65535),
});

export const patchIssueSchema = z.object({
    title: z.string().min(1, { message: "Issue title is required." }).max(255).optional(),
    description: z.string().min(1, { message: "Description is required." }).max(65535).optional(),
    assignedUserId: z.string().min(1, "User Id is required.").max(255).optional().nullable(),
    status: z.nativeEnum(Status).optional(),
});