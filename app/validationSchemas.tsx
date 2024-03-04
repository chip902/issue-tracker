import { z } from "zod";

export const createIssueSchema = z.object({
	title: z.string().min(1, "Please enter a valid title.").max(255),
	description: z.string().min(1, "Your description is too short."),
});
