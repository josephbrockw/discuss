'use client';

import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <Button 
      type="button" 
      color="primary"
      variant="flat"
      onPress={() => signOut()}
    >
      Sign Out
    </Button>
  );
}
