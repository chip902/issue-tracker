"use client";
import { Select } from "@radix-ui/themes";
import React from "react";

const AssigneeSelect = () => {
	return (
		<Select.Root>
			<Select.Trigger placeholder="Assign To..." />
			<Select.Content>
				<Select.Group>
					<Select.Label>Suggestions...</Select.Label>
					<Select.Item value="1">Andrew Chepurny</Select.Item>
				</Select.Group>
			</Select.Content>
		</Select.Root>
	);
};

export default AssigneeSelect;
