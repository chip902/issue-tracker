import { z } from "zod";

export const issueSchema = z.object({
	title: z.string().min(1, "Please enter a valid title.").max(255),
	description: z.string().min(1, "Your description is too short.").max(65535),
});

export const patchIssueSchema = z.object({
	title: z.string().min(1, "Please enter a valid title.").max(255).optional(),
	description: z.string().min(1, "Your description is too short.").max(65535).optional(),
	assignedToUserId: z.string().min(1, "Assign to user id is required.").max(255).optional().nullable(),
});
