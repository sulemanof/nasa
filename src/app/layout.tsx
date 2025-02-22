import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Footer from './components/Footer';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Explore NASA Images',
  description: "Next.js app consuming NASA's image API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-4 font-[family-name:var(--font-geist-sans)]">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
