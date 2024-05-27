import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssuesToolbar from "./IssuesToolbar";
import IssueTable, { IssueQuery } from "./IssueTable";

interface IssuesPageProps {
	searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: IssuesPageProps) => {
	const statuses = Object.values(Status);
	const status = statuses.includes(searchParams.status as Status) ? (searchParams.status as Status) : undefined;
	const where = { status };

	const orderBy = searchParams.orderBy ? { [searchParams.orderBy]: searchParams.orderDirection || "asc" } : {};
	const page = parseInt(searchParams.page) || 1;
	const pageSize = 10; // TODO Add a dropdown list component here
	const issues = await prisma.issue.findMany({
		where,
		orderBy,
		skip: (page - 1) * pageSize,
		take: pageSize,
	});

	const issueCount = await prisma.issue.count({
		where,
	});

	return (
		<div>
			<IssuesToolbar />
			<IssueTable searchParams={searchParams} issues={issues} />
			<br />
			<Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount} />
		</div>
	);
};

export default IssuesPage;
