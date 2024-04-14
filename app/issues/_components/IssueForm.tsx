"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { Issue } from "@prisma/client";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

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
			await axios.post("/api/issues", data);
			router.push("/issues");
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
					Submit New Issue
					{submitting && <LoadingSpinner />}
				</Button>
			</form>
		</div>
	);
};

export default NewIssuePage;
