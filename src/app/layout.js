import localFont from "next/font/local";
import "./globals.css";
import { GlobalProvider } from "@/context/Global";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "Tintoria",
  description: "Tintoria Web",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <AuthProvider>
          <GlobalProvider>{children}</GlobalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
