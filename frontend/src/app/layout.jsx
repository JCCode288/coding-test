import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
   SidebarInset,
   SidebarProvider,
   SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Suspense } from "react";
import Loading from "./loading";
import PromptSection from "@/components/prompt-section";

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

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
         >
            <SidebarProvider>
               <AppSidebar />
               <SidebarInset>
                  <Suspense fallback={<Loading />}>{children}</Suspense>
                  <Suspense fallback={<>Prompting..</>}>
                     <PromptSection />
                  </Suspense>
               </SidebarInset>
            </SidebarProvider>
         </body>
      </html>
   );
}
