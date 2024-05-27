import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "@/app/components";
import IssuesToolbar from "./IssuesToolbar";
import { Status } from "@prisma/client";

interface IssuesPageProps {
	searchParams: { status?: string };
}

const IssuesPage = async ({ searchParams }: IssuesPageProps) => {
	const statuses = Object.values(Status);
	const status = statuses.includes(searchParams.status as Status) ? (searchParams.status as Status) : undefined;

	const issues = await prisma.issue.findMany({
		where: status ? { status } : {},
	});

	return (
		<div>
			<IssuesToolbar />
			<Table.Root variant="surface">
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell>
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
		</div>
	);
};

export default IssuesPage;
