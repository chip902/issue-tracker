import Pagination from "./components/Pagination";

export default function Home({ searchParams }: { searchParams: { page: string } }) {
	return <Pagination pageSize={10} currentPage={parseInt(searchParams.page)} itemCount={100} />;
}
