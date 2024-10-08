"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoWarningOutline } from "react-icons/io5";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type IssueFormData = z.infer<typeof issueSchema>;

const NewIssuePage = ({ issue }: { issue?: Issue }) => {
	const router = useRouter();
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IssueFormData>({
		resolver: zodResolver(issueSchema),
	});
	const [error, setError] = useState("");
	const [submitting, isSubmitting] = useState(false);
	const onSubmit = handleSubmit(async (data) => {
		try {
			isSubmitting(true);
			if (issue) await axios.patch("/api/issues/" + issue.id, data);
			else await axios.post("/api/issues", data);
			router.push("/issues");
			router.refresh();
		} catch (error) {
			isSubmitting(false);
			setError("An unexpected error occured");
		}
	});
	return (
		<div className="max-w-xl">
			{error && (
				<Callout.Root color="red" className="mb-5">
					<Callout.Icon>
						<IoWarningOutline />
					</Callout.Icon>
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}
			<form className="space-y-3" onSubmit={onSubmit}>
				<TextField.Root>
					<TextField.Input defaultValue={issue?.title} size="3" placeholder="Title" {...register("title")} />
				</TextField.Root>
				<ErrorMessage>{errors.title?.message}</ErrorMessage>
				<Controller
					defaultValue={issue?.description}
					name="description"
					control={control}
					render={({ field }) => <SimpleMDE placeholder="Describe the issue..." {...field} />}
				/>
				<ErrorMessage>{errors.description?.message}</ErrorMessage>
				<Button disabled={submitting}>
					{issue ? "Update Issue" : "Submit New Issue"} {submitting && <LoadingSpinner />}
				</Button>
			</form>
		</div>
	);
};

export default NewIssuePage;
