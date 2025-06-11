// app/(auth)/verification/details/page.tsx  (SERVER)
import { currentUser } from "@clerk/nextjs/server";
import VerificationForm from "@/components/VerificationForm";

export default async function VerificationDetails() {
  const clerk = await currentUser();
  if (!clerk) {
    return <meta httpEquiv="refresh" content="0; url=/sign-in" />;
  }

  const clerkData = {
    firstName: clerk.firstName ?? "",
    lastName:  clerk.lastName ?? "",
    email:     clerk.emailAddresses?.[0]?.emailAddress ?? "",
  };

  return (
    <section className="auth-form-section">
      <VerificationForm clerkData={clerkData} />
    </section>
  );
}
