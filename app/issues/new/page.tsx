"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import LoadingSpinner from "@/app/components/LoadingSpinner";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
	const router = useRouter();
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IssueForm>({
		resolver: zodResolver(createIssueSchema),
	});
	const [error, setError] = useState("");
	const [submitting, isSubmitting] = useState(false);
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
			<form
				className="space-y-3"
				onSubmit={handleSubmit(async (data) => {
					try {
						isSubmitting(true);
						await axios.post("/api/issues", data);
						router.push("/issues");
					} catch (error) {
						isSubmitting(false);
						setError("An unexpected error occured");
					}
				})}>
				<TextField.Root>
					<TextField.Input size="3" placeholder="Title" {...register("title")} />
				</TextField.Root>
				<ErrorMessage>{errors.title?.message}</ErrorMessage>
				<Controller name="description" control={control} render={({ field }) => <SimpleMDE placeholder="Describe the issue..." {...field} />} />
				<ErrorMessage>{errors.description?.message}</ErrorMessage>
				<Button disabled={submitting}>
					Submit New Issue
					{submitting && <LoadingSpinner />}
				</Button>
			</form>
		</div>
	);
};

export default NewIssuePage;
