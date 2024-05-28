"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { VscRocket } from "react-icons/vsc";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import Skeleton from "./components/Skeleton";

const NavBar = () => {
	return (
		<nav className="border-b mb-5 px-5 py-3">
			<Container>
				<Flex justify="between">
					<Flex align="start" gap="3">
						<Link href="/">
							<VscRocket />
						</Link>
						<NavLinks />
					</Flex>
					<AuthStatus />
				</Flex>
			</Container>
		</nav>
	);
};

export default NavBar;

const NavLinks = () => {
	const currentPath = usePathname();
	const links = [
		{ label: "Dashboard", href: "/" },
		{ label: "Issues", href: "/issues" },
	];
	return (
		<ul className="flex space-x-6">
			{links.map((link) => (
				<li key={link.href}>
					<Link
						className={classnames({
							"nav-link": true,
							"!text-violet-400": link.href === currentPath,
						})}
						href={link.href}>
						{link.label}
					</Link>
				</li>
			))}
		</ul>
	);
};

const AuthStatus = () => {
	const { status, data: session } = useSession();
	if (status === "loading") return <Skeleton width="3rem" />;
	if (status === "unauthenticated") return <Link href="/api/auth/signin">Login</Link>;

	return (
		<Box>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Avatar referrerPolicy="no-referrer" className="cursor-pointer" radius="full" size="2" src={session!.user!.image!} fallback="?" />
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Label>
						<Text size="2">{session!.user!.email!}</Text>
					</DropdownMenu.Label>
					<DropdownMenu.Item>
						<Link className="nav-link" href="/api/auth/signout">
							Logout
						</Link>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Box>
	);
};
