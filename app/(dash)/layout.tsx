import type { Metadata } from "next";
import Sidebar from "../_components/Sidebar";
import Header from "../_components/Header";

export const metadata: Metadata = {
  title: "Simple Stock",
  description: "Simple Store Stock Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen grid grid-rows-[70px_1fr] grid-cols-[240px_1fr]">
      {/* Top Navbar */}
      <Header />
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="row-span-1 col-span-1 bg-gray-100 p-4">{children}</main>
    </div>
  );
}
