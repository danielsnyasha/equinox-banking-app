"use client";

import { useState } from "react";
import { signUp } from "@/lib/actions/user.actions";

export default function VerificationForm({
  clerkData
}: {
  clerkData: { firstName: string; lastName: string; email: string };
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ...clerkData,
    address: "",
    city: "",
    state: "",
    postalCode: "",
    dateOfBirth: "",
    ssn: "",
    password: ""     // user re-confirms / sets banking password
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signUp(formData as any);          // server action does Appwrite + Prisma
    window.location.href = "/";             // land on homepage
  };

  return (
    <form onSubmit={onSubmit} className="auth-form max-w-md mx-auto space-y-4">
      {Object.entries(formData).map(([key, value]) => {
        const readOnly = key in clerkData;
        return (
          <div key={key} className="flex flex-col">
            <label className="capitalize mb-1">{key}</label>
            <input
              type={key === "password" ? "password" : "text"}
              name={key}
              value={value}
              onChange={onChange}
              disabled={readOnly || loading}
              required
              className={`input ${
                readOnly ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />
          </div>
        );
      })}
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full"
      >
        {loading ? "Submitting…" : "Verify & Continue"}
      </button>
    </form>
  );
}
