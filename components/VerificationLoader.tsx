"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VerificationLoader({ verified }: { verified: boolean }) {
  const router = useRouter();
  const [count, setCount] = useState(5);          // 5-second timer

  // countdown display
  useEffect(() => {
    const int = setInterval(() => setCount(c => c - 1), 1000);
    return () => clearInterval(int);
  }, []);

  // redirect after 5 s
  useEffect(() => {
    const to = setTimeout(() => {
      router.push(verified ? "/" : "/verification/details");
    }, 5000);
    return () => clearTimeout(to);
  }, [verified, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      {/* rotating circle */}
      <div className="h-16 w-16 rounded-full border-4 border-t-transparent border-blue-600 animate-spin" />
      <p className="text-lg font-medium">
        Checking if user is verified … <span>{count}</span>
      </p>
    </div>
  );
}
