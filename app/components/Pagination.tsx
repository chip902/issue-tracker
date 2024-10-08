"use client";
import { DoubleArrowLeftIcon, DoubleArrowRightIcon, ChevronRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

interface Props {
	itemCount: number;
	pageSize: number;
	currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pageCount = Math.ceil(itemCount / pageSize);

	const changePage = (page: number) => {
		const params = new URLSearchParams(searchParams || "");
		params.set("page", page.toString());
		router.push("?" + params.toString());
	};

	if (pageCount <= 1) return null;
	return (
		<Suspense>
			<Flex align="center" gap="2">
				<Button color="gray" variant="soft" onClick={() => changePage(1)} disabled={currentPage === 1}>
					<DoubleArrowLeftIcon />
				</Button>
				<Button color="gray" variant="soft" onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
					<ChevronLeftIcon />
				</Button>
				<Text size="2">
					Page {currentPage} of {pageCount}
				</Text>
				<Button color="gray" variant="soft" onClick={() => changePage(currentPage + 1)} disabled={currentPage === pageCount}>
					<ChevronRightIcon />
				</Button>
				<Button color="gray" variant="soft" onClick={() => changePage(pageCount)} disabled={currentPage === pageCount}>
					<DoubleArrowRightIcon />
				</Button>
			</Flex>
		</Suspense>
	);
};

export default Pagination;
