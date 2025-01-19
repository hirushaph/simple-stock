import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Bounce, ToastContainer } from "react-toastify";

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
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
        {children}
      </body>
    </html>
  );
}
