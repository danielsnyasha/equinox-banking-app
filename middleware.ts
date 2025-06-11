import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    '/((?!_next|.*\\.(?:svg|png|jpg|jpeg|webp|ico|css|js|txt|json|map|woff2?|ttf|eot|html?|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
