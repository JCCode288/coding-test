import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";

import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarGroup,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarMenuSub,
   SidebarMenuSubButton,
   SidebarMenuSubItem,
   SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import PromptSection from "./prompt-section";
import { Suspense } from "react";

// This is sample data.
const data = {
   navMain: [
      {
         title: "Representatives",
         url: "/",
      },
      {
         title: "Deals",
         url: "/deals",
      },
      {
         title: "Clients",
         url: "/clients",
      },
   ],
};

export function AppSidebar({ ...props }) {
   return (
      <Sidebar {...props}>
         <SidebarHeader>
            <SidebarMenu>
               <SidebarMenuItem>
                  <SidebarMenuButton size="lg" asChild>
                     <a href="#">
                        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                           <GalleryVerticalEnd className="size-4" />
                        </div>
                        <div className="flex flex-col gap-0.5 leading-none">
                           <span className="font-medium">Coding Test</span>
                           <span className="">v1.0.0</span>
                        </div>
                     </a>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarHeader>
         <SidebarContent>
            <SidebarGroup>
               <SidebarMenu>
                  {data.navMain.map((item) => (
                     <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                           <Link href={item.url} className="font-medium">
                              {item.title}
                           </Link>
                        </SidebarMenuButton>
                        {item.items?.length ? (
                           <SidebarMenuSub>
                              {item.items.map((item) => (
                                 <SidebarMenuSubItem key={item.title}>
                                    <SidebarMenuSubButton asChild>
                                       <Link href={item.url}>
                                          {item.title}
                                       </Link>
                                    </SidebarMenuSubButton>
                                 </SidebarMenuSubItem>
                              ))}
                           </SidebarMenuSub>
                        ) : null}
                     </SidebarMenuItem>
                  ))}
               </SidebarMenu>
            </SidebarGroup>
         </SidebarContent>
         <SidebarFooter>
            <Suspense fallback={<>Prompting..</>}>
               <PromptSection />
            </Suspense>
         </SidebarFooter>
         <SidebarRail />
      </Sidebar>
   );
}
