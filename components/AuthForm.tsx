'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { signUp } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';

interface AuthFormProps {
  type: 'sign-in' | 'sign-up' | 'verification';
  initialData?: Partial<SignUpParams>;
}

export default function AuthForm({ type, initialData = {} }: AuthFormProps) {
  const { register, handleSubmit } = useForm({ defaultValues: initialData });
  const router = useRouter();

  const handleFormSubmit = async (data: SignUpParams) => {
    if (type === 'sign-up') {
      await signUp(data);
      router.push('/verification');
    } else if (type === 'verification') {
      // POST all verification data to Appwrite (same as sign-up logic or custom as needed)
      await signUp(data);
      router.push('/homepage');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {type !== 'sign-in' && (
        <>
          <input {...register('firstName')} placeholder="First Name" required />
          <input {...register('lastName')} placeholder="Last Name" required />
          <input {...register('address')} placeholder="Address" required />
          <input {...register('city')} placeholder="City" required />
          <input {...register('state')} placeholder="State" required />
          <input {...register('postalCode')} placeholder="Postal Code" required />
          <input type="date" {...register('dateOfBirth')} required />
          <input {...register('ssn')} placeholder="SSN" required />
        </>
      )}

      <input type="email" {...register('email')} placeholder="Email" required />
      <input type="password" {...register('password')} placeholder="Password" required />

      <button type="submit">
        {type === 'sign-up' ? 'Sign Up' : type === 'verification' ? 'Verify' : 'Sign In'}
      </button>
    </form>
  );
}
