"use client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const statuses: { label: string; value?: string }[] = [
	{ label: "All", value: "ALL" },
	{ label: "Open", value: "OPEN" },
	{ label: "In Progress", value: "IN_PROGRESS" },
	{ label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
	const searchParams = useSearchParams();
	const router = useRouter();

	return (
		<Suspense>
			<Select.Root
				defaultValue={searchParams?.get("status") || ""}
				onValueChange={(status) => {
					const params = new URLSearchParams();
					if (status) params.append("status", status);
					if (searchParams?.get("orderBy")) params.append("orderBy", searchParams.get("orderBy")!);
					const query = params.size ? "?" + params.toString() : "";
					router.push("/issues" + query);
				}}>
				<Select.Trigger placeholder="Filter by status..." />
				<Select.Content>
					{statuses.map((status) => (
						<Select.Item key={status.value} value={status.value ?? "ALL"}>
							{status.label}
						</Select.Item>
					))}
				</Select.Content>
			</Select.Root>
		</Suspense>
	);
};

export default IssueStatusFilter;
