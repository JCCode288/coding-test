import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Suspense } from "react";
import Loading from "./loading";
import { AppSidebar } from "@/components/app-sidebar";

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

export const metadata = {
   title: "Create Next App",
   description: "Generated by create next app",
};

export default function RootLayout({ children, detail }) {
   return (
      <html lang="en">
         <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
         >
            <SidebarProvider>
               <AppSidebar />
               <SidebarInset>
                  <Suspense fallback={<Loading />}>{children}</Suspense>
                  <div>{detail}</div>
               </SidebarInset>
            </SidebarProvider>
         </body>
      </html>
   );
}
