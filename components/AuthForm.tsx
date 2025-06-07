'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

// shadcn/ui components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';

// React-Hook-Form & Zod
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Utils
import { authFormSchema } from '@/lib/utils';
// Reusable Input
import CustomInput from '@/components/CustomInput';

type AuthType = 'sign-in' | 'sign-up' | 'link';

export default function AuthForm({ type }: { type: AuthType }) {
  const [user] = useState<null | { id: string }>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Schema & form setup
  const schema = authFormSchema(type);
  type FormValues = z.infer<typeof schema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      console.log(type, values);
      // TODO: call API
    } finally {
      setIsLoading(false);
    }
  };

  const isLink = !!user;

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
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
            <span className="font-ibm-plex-serif text-2xl font-bold">Equinox</span>
          </Link>
          <h2 className="mt-4 text-center text-2xl font-semibold text-purple-800">
            {isLink ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
          </h2>
          <p className="mt-1 text-center text-sm text-gray-600">
            {isLink
              ? 'Link your account to get started'
              : 'Please fill in the form below'}
          </p>
        </header>

        {/* Link Account (future) */}
        {isLink && (
          <Form {...form}>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <CustomInput control={form.control as any} name="bankName" label="Bank Name" placeholder="Equinox Bank" />
              <CustomInput control={form.control as any} name="accountNumber" label="Account Number" placeholder="••••••••" />
              <Button type="button" disabled className="w-full">
                Link with Plaid (Coming Soon)
              </Button>
            </form>
          </Form>
        )}

        {/* Sign In / Sign Up */}
        {!isLink && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {type === 'sign-up' && (
                <>
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <CustomInput control={form.control} name="firstName" label="First Name" placeholder="Jane" />
                    <CustomInput control={form.control} name="lastName" label="Last Name" placeholder="Doe" />
                  </div>

                  {/* Address */}
                  <CustomInput control={form.control} name="address1" label="Address" placeholder="123 Main St" />

                  {/* City & State */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <CustomInput control={form.control} name="city" label="City" placeholder="San Francisco" />
                    <CustomInput control={form.control} name="state" label="State" placeholder="CA" />
                  </div>

                  {/* Postal & SSN */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <CustomInput control={form.control} name="postalCode" label="Postal Code" placeholder="94016" />
                    <CustomInput control={form.control} name="ssn" label="SSN" placeholder="XXX-XX-XXXX" />
                  </div>

                  {/* Date of Birth */}
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <div>
                        <FormLabel>Date of Birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button variant="outline" className="w-full text-left">
                                {field.value
                                  ? format(field.value as Date, 'PPP')
                                  : 'Select Date'}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="p-0 w-auto">
                            <Calendar
                              mode="single"
                              selected={field.value as unknown as Date}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage className="text-xs text-red-600 mt-1" />
                      </div>
                    )}
                  />
                </>
              )}

              {/* Email & Password */}
              <div className={type === 'sign-up' ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : ''}>
                <CustomInput control={form.control} name="email" label="Email" placeholder="you@example.com" />
                <CustomInput control={form.control} name="password" label="Password" placeholder="••••••••" />
              </div>

              {/* Submit */}
              <Button type="submit" disabled={isLoading || form.formState.isSubmitting} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />Processing...
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
                  <>Don't have an account? <Link href="/sign-up" className="text-purple-800 font-medium hover:underline">Sign Up</Link></>
                ) : (
                  <>Already have an account? <Link href="/sign-in" className="text-purple-800 font-medium hover:underline">Sign In</Link></>
                )}
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
