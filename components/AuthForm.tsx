'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

// shadcn/ui components
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

// react‑hook‑form & zod validation
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

/* -------------------------
   Validation Schemas & Types
--------------------------*/
const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const signUpSchema = z.object({
  fullName: z.string().min(2, { message: 'Name is too short' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type SignInFormValues = z.infer<typeof signInSchema>;
type SignUpFormValues = z.infer<typeof signUpSchema>;

type AuthType = 'sign-in' | 'sign-up' | 'link';

/* -------------------------
   Component
--------------------------*/
const AuthForm = ({ type }: { type: AuthType }) => {
  const [user, setUser] = useState<null | { id: string }>(null);

  // Forms
  const signInForm = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
  });

  const signUpForm = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
  });

  const handleSignIn = (data: SignInFormValues) => {
    console.log('SIGN‑IN', data);
  };

  const handleSignUp = (data: SignUpFormValues) => {
    console.log('SIGN‑UP', data);
  };

  const isSignIn = !user && type === 'sign-in';
  const isSignUp = !user && type === 'sign-up';
  const isLinkAccount = !!user;

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/background/bg5.jpg"
        alt="Background"
        fill
        priority
        className="object-cover"
      />

      {/* Card */}
      <div className="relative z-10 mx-4 w-full max-w-md rounded-xl border border-gray-300 bg-white p-8 shadow-lg sm:mx-0">
        {/* Header */}
        <header className="mb-8 flex flex-col items-center">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src="/logo.svg" alt="logo" width={34} height={34} />
            <h1 className="font-ibm-plex-serif text-2xl font-bold text-black-1">Equinox</h1>
          </Link>
          <h1 className="mt-6 text-center font-ibm-plex-serif text-lg font-semibold text-rose-500">
            {isLinkAccount ? 'Link Account' : isSignIn ? 'Sign In' : 'Sign Up'}
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLinkAccount ? 'Link your account to get started' : 'Please enter your details'}
          </p>
        </header>

        {/* LINK ACCOUNT (future) */}
        {isLinkAccount && (
          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input id="bankName" placeholder="e.g. Equinox Bank" disabled />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input id="accountNumber" placeholder="••••••••" disabled />
            </div>
            <Button type="button" disabled>
              Link with Plaid (Coming Soon)
            </Button>
          </form>
        )}

        {/* SIGN‑IN FORM */}
        {isSignIn && (
          <form
            className="flex flex-col gap-5"
            onSubmit={signInForm.handleSubmit(handleSignIn)}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...signInForm.register('email')}
              />
              {signInForm.formState.errors.email && (
                <p className="text-xs text-red-600">
                  {signInForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...signInForm.register('password')}
              />
              {signInForm.formState.errors.password && (
                <p className="text-xs text-red-600">
                  {signInForm.formState.errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" disabled={signInForm.formState.isSubmitting}>
              {signInForm.formState.isSubmitting ? 'Signing In…' : 'Sign In'}
            </Button>
          </form>
        )}

        {/* SIGN‑UP FORM */}
        {isSignUp && (
          <form
            className="flex flex-col gap-5"
            onSubmit={signUpForm.handleSubmit(handleSignUp)}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                {...signUpForm.register('fullName')}
              />
              {signUpForm.formState.errors.fullName && (
                <p className="text-xs text-red-600">
                  {signUpForm.formState.errors.fullName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...signUpForm.register('email')}
              />
              {signUpForm.formState.errors.email && (
                <p className="text-xs text-red-600">
                  {signUpForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...signUpForm.register('password')}
              />
              {signUpForm.formState.errors.password && (
                <p className="text-xs text-red-600">
                  {signUpForm.formState.errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" disabled={signUpForm.formState.isSubmitting}>
              {signUpForm.formState.isSubmitting ? 'Creating…' : 'Create Account'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
