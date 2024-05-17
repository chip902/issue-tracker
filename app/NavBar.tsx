"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { VscRocket } from "react-icons/vsc";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";

const NavBar = () => {
	const currentPath = usePathname();
	const { status, data: session } = useSession();
	const links = [
		{ label: "Dashboard", href: "/" },
		{ label: "Issues", href: "/issues" },
	];

	return (
		<nav className="border-b mb-5 px-5 py-3">
			<Container>
				<Flex justify="between" align="start" gap="3">
					<Link href="/">
						<VscRocket />
					</Link>
					<Flex justify="between">
						<ul className="flex space-x-6">
							{links.map((link) => (
								<li key={link.href}>
									<Link
										className={classnames({
											"text-zinc-900": link.href === currentPath,
											"text-zinc-500": link.href != currentPath,
											"hover:text-zinc-800 transition-colors": true,
										})}
										href={link.href}>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</Flex>
					<Box>
						{status === "authenticated" && (
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									<Avatar className="cursor-pointer" radius="full" size="2" src={session.user!.image!} fallback="?" />
								</DropdownMenu.Trigger>
								<DropdownMenu.Content>
									<DropdownMenu.Label>
										<Text size="2">{session.user!.email!}</Text>
									</DropdownMenu.Label>
									<DropdownMenu.Item>
										<Link href="/api/auth/signout">Logout</Link>
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						)}
						{status === "unauthenticated" && <Link href="/api/auth/signin">Login</Link>}
					</Box>
				</Flex>
			</Container>
		</nav>
	);
};

export default NavBar;
