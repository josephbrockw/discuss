'use client';

import { Button } from "@nextui-org/react";
import * as actions from "@/actions";
import Profile from "@/components/profile";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      <form action={actions.signIn}>
        <Button type="submit">Sign In</Button>
      </form>
      <Button 
        type="button" 
        onClick={() => signOut()}
      >
        Sign Out
      </Button>

      { 
        session?.user ? (
          <div>
            <p>Welcome, {session.user.name}!</p>
            <p>{JSON.stringify(session.user)}</p>
          </div>
        ) : (
          <p>Please sign in.</p>
        )
      }

      <Profile />
    </div>
  );
}
