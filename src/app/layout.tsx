import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "VoluntRED Prototype",
  description: "VoluntRED Prototype WEB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
    
      >
        {children}
      </body>
    </html>
  );
}
