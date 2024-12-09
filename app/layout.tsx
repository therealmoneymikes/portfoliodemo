import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Inter, Poppins } from "next/font/google";
import "./theme-config.css";
import ThemeProvider from "./providers/theme/ThemeProvider";
import MainComponent from "./MainComponent";
import AuthProvider from "./providers/auth/AuthProvider";
import { SessionProvider } from "next-auth/react";
import ThirdAuthProvider from "./providers/thirdpartyauth/ThirdAuthProvider";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "300", "500"],
});

export const metadata: Metadata = {
  title: "MikeTheDev",
  description: "MikeTheDev",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {


  return (
    <html
      lang="en"
      data-theme="cupcake"
      style={{ width: "100%", height: "100vh", overflowY: "hidden" }}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.variable} style={{ height: "100vh" }}>
        <ThirdAuthProvider>
          <AuthProvider>
            <ThemeProvider>
              <MainComponent>{children}</MainComponent>
            </ThemeProvider>
          </AuthProvider>
        </ThirdAuthProvider>
      </body>
    </html>
  );
}
