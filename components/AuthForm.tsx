'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import CustomInput from '@/components/CustomInput';
import { Loader2 } from 'lucide-react';

import { authFormSchema } from '@/lib/utils';
import { signIn, signUp } from '@/lib/actions/user.actions';
import { Input } from './ui/input';

type AuthType = 'sign-in' | 'sign-up';
type SignUpParams = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  email: string;
  password: string;
};

export default function AuthForm({ type }: { type: AuthType }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Zod schema & RHF setup
  const schema = authFormSchema(type);
  type FormValues = z.infer<typeof schema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      if (type === 'sign-up') {
        const {
          firstName,
          lastName,
          address,
          city,
          state,
          postalCode,
          dateOfBirth,
          ssn,
          email,
          password,
        } = data as FormValues & SignUpParams;

        const newUser = await signUp({
          firstName,
          lastName,
          address,
          city,
          state,
          postalCode,
          dateOfBirth,
          ssn,
          email,
          password,
        });
        setUser(newUser);

        // show toast and redirect to sign-in after 3s
        toast.success('Account created successfully! Redirecting to Sign In…');
        setTimeout(() => {
          router.push('/sign-in');
        }, 3000);
      }

      if (type === 'sign-in') {
        const resp = await signIn({
          email: (data as any).email,
          password: (data as any).password,
        });
        if (resp) {
          toast.success('Signed in successfully! Redirecting to Home…');
          router.push('/');
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const isLink = !!user;

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      {/* Toast container */}
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Background */}
      <Image
        src="/background/bg5.jpg"
        alt="Background"
        fill
        className="object-cover"
        priority
      />

      <div className="relative z-10 w-full max-w-md rounded-xl border border-gray-300 bg-white p-8 shadow-lg mx-4 sm:mx-0">
        {/* Header */}
        <header className="flex flex-col items-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image src="/logo.svg" alt="logo" width={32} height={32} />
            <span className="font-ibm-plex-serif text-2xl font-bold">
              Equinox
            </span>
          </Link>
          <h2 className="mt-4 text-center text-lg font-semibold text-purple-800">
            {isLink
              ? 'Link Account'
              : type === 'sign-in'
              ? 'Sign In'
              : 'Sign Up'}
          </h2>
          <p className="mt-1 text-center text-sm text-gray-600">
            {isLink
              ? 'Link your account to get started'
              : 'Please fill in the form below'}
          </p>
        </header>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {type === 'sign-up' && (
              <>
                {/* Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CustomInput
                    control={form.control}
                    name="firstName"
                    label="First Name"
                    placeholder="Jane"
                  />
                  <CustomInput
                    control={form.control}
                    name="lastName"
                    label="Last Name"
                    placeholder="Doe"
                  />
                </div>

                {/* Address */}
                <CustomInput
                  control={form.control}
                  name="address"
                  label="Address"
                  placeholder="123 Main St"
                />

                {/* City & State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CustomInput
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="San Francisco"
                  />
                  <CustomInput
                    control={form.control}
                    name="state"
                    label="State"
                    placeholder="CA"
                  />
                </div>

                {/* Postal & SSN */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CustomInput
                    control={form.control}
                    name="postalCode"
                    label="Postal Code"
                    placeholder="94016"
                  />
                  <CustomInput
                    control={form.control}
                    name="ssn"
                    label="SSN"
                    placeholder="XXX-XX-XXXX"
                  />
                </div>

                {/* Date of Birth */}
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <div>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          placeholder="YYYY-MM-DD"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="mt-1 text-xs text-red-600" />
                    </div>
                  )}
                />
              </>
            )}

            {/* Email & Password */}
            <div
              className={
                type === 'sign-up'
                  ? 'grid grid-cols-1 sm:grid-cols-2 gap-4'
                  : ''
              }
            >
              <CustomInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="you@example.com"
              />
              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="••••••••"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading || form.formState.isSubmitting}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Processing...
                </>
              ) : type === 'sign-in' ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
            </Button>

            {/* Footer */}
            <div className="text-center text-sm text-gray-600">
              {type === 'sign-in' ? (
                <>
                  Don't have an account?{' '}
                  <Link
                    href="/sign-up"
                    className="text-purple-800 font-medium hover:underline"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <Link
                    href="/sign-in"
                    className="text-purple-800 font-medium hover:underline"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
