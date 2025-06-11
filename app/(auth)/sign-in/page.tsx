// app/(auth)/sign-in/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import AuthForm from "@/components/AuthForm";          // ← your existing AuthForm

export default function SignInPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/verification");  // everyone funnels here
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <section className="auth-form-section">
      <AuthForm type="sign-in" />
    </section>
  );
}
