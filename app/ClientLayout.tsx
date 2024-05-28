"use client";
import { Container, Theme, ThemePanel } from "@radix-ui/themes";
import AuthProvider from "./auth/Provider";
import InterFontComponent from "./InterFontComponent";
import NavBar from "./NavBar";
import QueryClientProvider from "./QueryClientProvider";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<InterFontComponent />
			<QueryClientProvider>
				<AuthProvider>
					<Theme appearance="dark" accentColor="iris" radius="large">
						<NavBar />
						<main className="p-5">
							<Container>{children}</Container>
						</main>
					</Theme>
				</AuthProvider>
			</QueryClientProvider>
		</>
	);
}
