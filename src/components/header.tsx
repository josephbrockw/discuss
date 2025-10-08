import Link from "next/link";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@nextui-org/react";
import React from "react";
import HeaderAuth from "@/components/client/HeaderAuth";
import SearchInput from "@/components/SearchInput";

export default function Header() {
    return (
        <Navbar className="shadow mb-6">
            <NavbarBrand>
                <Link href="/" className="font-bold">
                    Discuss
                </Link>
            </NavbarBrand>
            <NavbarContent justify="center">
                <NavbarItem>
                    <SearchInput />
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <HeaderAuth />
            </NavbarContent>
        </Navbar>
    )
}

