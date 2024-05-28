import "@radix-ui/themes/styles.css";
import "./globals.css";
import "./theme-config.css";
import ClientLayout from "./ClientLayout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<ClientLayout>{children}</ClientLayout>
			</body>
		</html>
	);
}
