import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "@/app/components";
import NextLink from "next/link";

export interface IssueQuery {
	status?: string;
	orderBy?: keyof Issue;
	orderDirection?: "asc" | "desc";
	page: string;
}
interface Props {
	searchParams: IssueQuery;
	issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
	const currentOrderDirection = searchParams.orderDirection === "asc" ? "desc" : "asc";

	return (
		<Table.Root variant="surface">
			<Table.Header>
				<Table.Row>
					{columns.map((column) => (
						<Table.ColumnHeaderCell key={column.value} className={column.className}>
							<NextLink
								href={{
									query: {
										...searchParams,
										orderBy: column.value,
										orderDirection: column.value === searchParams.orderBy ? currentOrderDirection : "asc",
									},
								}}>
								{column.label}
							</NextLink>
							{column.value === searchParams.orderBy ? (
								searchParams.orderDirection === "asc" ? (
									<ArrowUpIcon className="inline" />
								) : (
									<ArrowDownIcon className="inline" />
								)
							) : (
								<ArrowDownIcon className="inline" />
							)}
						</Table.ColumnHeaderCell>
					))}
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{issues
					.filter((issue) => issue.status !== null && issue.status !== undefined)
					.map((issue) => (
						<Table.Row key={issue.id}>
							<Table.Cell>
								<Link href={`/issues/${issue.id}`}>{issue.title}</Link>
								<div className="block md:hidden">
									<IssueStatusBadge status={issue.status as Status} />
								</div>
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">
								<IssueStatusBadge status={issue.status as Status} />
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">{new Date(issue.createdAt).toDateString()}</Table.Cell>
						</Table.Row>
					))}
			</Table.Body>
		</Table.Root>
	);
};

const columns: {
	label: string;
	value: keyof Issue;
	className?: string;
}[] = [
	{ label: "Issue", value: "title" },
	{ label: "Status", value: "status", className: "hidden md:table-cell" },
	{ label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];
export const columnNames = columns.map((column) => column.value);

export default IssueTable;
