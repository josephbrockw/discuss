import Link from "next/link";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
    Input,
    Avatar
} from "@nextui-org/react";
import { auth } from "@/auth";
import React from "react";

export default async function Header() {
    const session = await auth();
    
    let authContent: React.ReactNode;
    if (session?.user) {
        authContent = <Avatar src={session.user.image || ''} alt={session.user.name || "User"} />;
    } else {
        authContent = <>
            <NavbarItem>
                <Button type="submit" color="secondary" variant="bordered">
                    Sign In
                </Button>
            </NavbarItem>
            <NavbarItem>
                <Button type="button" color="primary" variant="flat">
                    Sign Up
                </Button>
            </NavbarItem>
        </> 
    }

    return (
        <Navbar className="shandow mb-6">
            <NavbarBrand>
                <Link href="/" className="font-bold">
                    Discuss
                </Link>
            </NavbarBrand>
            <NavbarContent justify="center">
                <NavbarItem>
                    <Input />
                </NavbarItem>

            </NavbarContent>
            <NavbarContent justify="end">
                {authContent}
            </NavbarContent>
        </Navbar>
    )
}

