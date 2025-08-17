
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Feed from './components/Feed';
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
        <div className="flex min-h-screen">
  <Sidebar />
  
  {/* Main content area */}
  <main className="flex-1 overflow-auto pt-14">
    <Feed/>
  </main>
</div>
      </body>
    </html>
  );
}
