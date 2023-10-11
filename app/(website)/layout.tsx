import Header from "@/components/Header";
import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Andover Chess",
  description: "Andover Chess Club",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="bg-slate-200 mt-14">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
