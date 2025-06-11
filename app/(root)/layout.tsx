import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,

} from '@clerk/nextjs';

import { currentUser } from '@clerk/nextjs/server';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';
import Image from 'next/image';
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  return (
    <>
      {/* ---------- Signed-out users ---------- */}
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      {/* ---------- Signed-in users ---------- */}
      <SignedIn>
        <div className="flex h-screen w-full">
          <Sidebar
            user={{
              name: user?.fullName ?? '',
              email: user?.emailAddresses[0]?.emailAddress ?? '',
            }}
          />
          <div className="flex flex-1 flex-col">
            <div className="root-layout">
              <Image src="/icons/logo.svg" alt="logo" width={30} height={30} />
              <MobileNav user={{ name: user?.fullName ?? '' }} />
            </div>
            {children}
          </div>
        </div>
      </SignedIn>
    </>
  );
}
