
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ljithiad ',
  description: 'Explore communities, share content, and connect with others on this Reddit-inspired platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        <TopBar />
        <Sidebar />
        <main className="ml-0 lg:ml-16 lg:ml-96 transition-all duration-300 ease-in-out pt-14 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
