import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata = { title: "QVote" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-full bg-[#0b0f0c] text-gray-100 flex flex-col">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
      </body>
    </html>
  );
}
