import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Simple Stock",
  description: "Simple Stroe Stock Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased bg-background `}>
        <main className="h-screen grid grid-rows-[80px_1fr] grid-cols-[240px_1fr]">
          {/* Top Navbar */}
          <Header />

          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="row-span-1 col-span-1 bg-gray-100 p-4">
            {children}
          </main>
        </main>
      </body>
    </html>
  );
}
