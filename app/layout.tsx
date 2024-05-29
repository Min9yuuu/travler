import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Travler',
  description: 'Travler, 당신의 여행을 공유해요',
  icons: {
    icon: './favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 max-w-screen-sm mx-auto`}>{children}</body>
    </html>
  );
}
