"use client";
import { LoadingSpinner } from "@/app/components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
	const router = useRouter();
	const [error, setError] = useState(false);
	const [isDeleting, setDeleting] = useState(false);
	const deleteIssue = async () => {
		try {
			setDeleting(true);
			await axios.delete("/api/issues/" + issueId);
			router.push("/issues");
			router.refresh();
		} catch (error) {
			setDeleting(false);
			setError(true);
		}
	};
	return (
		<>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button color="red" disabled={isDeleting}>
						Delete Issue
						{isDeleting && <LoadingSpinner />}
					</Button>
				</AlertDialog.Trigger>
				<AlertDialog.Content>
					<AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
					<AlertDialog.Description>Are you sure you want to delete this issue? This action cannot be undone.</AlertDialog.Description>
					<Flex mt="4" gap="3">
						<AlertDialog.Cancel>
							<Button variant="soft">Cancel</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action>
							<Button color="red" onClick={deleteIssue}>
								Confirm
							</Button>
						</AlertDialog.Action>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>
			<AlertDialog.Root open={error}>
				<AlertDialog.Content>
					<AlertDialog.Title>Error</AlertDialog.Title>
					<AlertDialog.Description>This issue cannot be deleted.</AlertDialog.Description>
					<AlertDialog.Cancel>
						<Button mt="4" variant="soft" color="gray" onClick={() => setError(false)}>
							Ok
						</Button>
					</AlertDialog.Cancel>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</>
	);
};

export default DeleteIssueButton;
