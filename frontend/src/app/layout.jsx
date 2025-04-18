import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

export const metadata = {
   title: "Coding Test App | Main",
   description: "Coding Test by @JCCode288 Main Representative Page",
   keyword: "representative, coding-test, cms",
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
                  {children}
                  {detail}
               </SidebarInset>
            </SidebarProvider>
            <Toaster />
         </body>
      </html>
   );
}
