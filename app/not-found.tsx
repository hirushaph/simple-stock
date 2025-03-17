import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "Sorry, the page you're looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4">
        Sorry, the page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="mt-6 text-blue-500 underline">
        Go Back Home
      </Link>
    </div>
  );
}
