export const dynamic = 'force-dynamic'

import type { Metadata } from "next";
import { IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';


const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ibm-plex-serif'
});

export const metadata: Metadata = {
  title: "Equinox",
  description: "Equinox is a modern banking platform for everyone.",
  icons: {
    icon: './logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexSerif.variable}`}
        style={{
          fontFamily: `'Segoe UI Variable', 'Segoe UI', 'Calibri', 'Source Sans 3', system-ui, Arial, sans-serif`
        }}
      >
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
