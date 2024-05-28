// pages/_app.tsx
import type { AppProps } from "next/app";
import "../app/global.css";
import Layout from "../app/layout";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
