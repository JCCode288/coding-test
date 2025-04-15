"use client";
import { useMemo } from "react";
import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "./ui/pagination";
import { nextPageUrl, prevPageUrl } from "@/utils/pagination.link";
import { useSearchParams } from "next/navigation";

export default function PagePagination({
   baseUrl,
   total_page,
   current_page,
}) {
   const searchParams = useSearchParams();
   const limit = searchParams.get("limit") ?? 10;

   const prevPage = useMemo(
      () => prevPageUrl(baseUrl, current_page, total_page)(+limit),
      [baseUrl, current_page, limit]
   );
   const nextPage = useMemo(
      () => nextPageUrl(baseUrl, current_page, total_page)(+limit),
      [baseUrl, current_page, limit]
   );

   return (
      <Pagination>
         <PaginationContent>
            <PaginationItem>
               <PaginationPrevious
                  disabled={!prevPage.valid}
                  href={prevPage.url}
               />
            </PaginationItem>

            <PaginationItem>
               <PaginationLink href="#" isActive>
                  {current_page}
               </PaginationLink>
            </PaginationItem>

            <PaginationItem>
               <PaginationNext
                  disabled={!nextPage.valid}
                  href={nextPage.url}
               />
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   );
}
