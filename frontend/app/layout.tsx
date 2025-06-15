import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "../components/ui/sonner"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Share Bill',
    description: 'Easy way to split the bill with your friends',
    
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
            {children}
            <footer className="text-center p-4 bg-gray-100">
                <p className="text-sm text-gray-600">
                    © {new Date().getFullYear()} Share Bill. All rights reserved.
                </p>
            </footer>
            <Toaster />
        </body>
        </html>
    );
}
