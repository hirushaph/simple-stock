import type { Metadata } from "next";

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
    <main className="row-span-1 col-span-1 p-4">
      <div className="flex justify-center w-full pt-20">{children}</div>
    </main>
  );
}
