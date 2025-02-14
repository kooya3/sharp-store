import type { Metadata } from "next";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";


export const metadata: Metadata = {
  title: "Sharp Impressions - School Uniforms",
  description: "Quality school uniforms and accessories",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body>
        <main>
        <Header />
        {children}
        </main>    
      </body>
    </html>
    </ClerkProvider>
  );
}
