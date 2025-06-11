"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import VerificationForm from "@/components/VerificationForm";


export default function VerificationPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (verified) router.push("/");
  }, [verified, router]);

  if (!isLoaded) return <div>Loading...</div>;

  const clerkData = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.emailAddresses[0]?.emailAddress || "",
  };

  return (
    <section className="auth-form-section">
      <VerificationForm clerkData={clerkData} setVerified={setVerified} />
    </section>
  );
}
