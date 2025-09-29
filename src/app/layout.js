import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata = { title: "QVote" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className="h-full text-gray-100 flex flex-col 
                   bg-gradient-to-br from-[#0a0a12] via-[#111827] to-[#0a0a12] 
                   relative overflow-hidden"
      >
        {/* Subtle glowing background effect */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-[1000px] h-[1000px] bg-purple-700/20 rounded-full blur-[160px] top-[-300px] left-[-300px]" />
          <div className="absolute w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[140px] bottom-[-200px] right-[-200px]" />
        </div>

        <Navbar />
        <main className="flex-1 w-full">{children}</main>
      </body>
    </html>
  );
}
