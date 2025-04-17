import AddNewButton from "@/components/add-new-button";
import DealsTable from "@/components/deals-table";
import PageHeader from "@/components/page-header";
import PagePagination from "@/components/page-pagination";
import { getDeals } from "@/lib/api";
import Link from "next/link";

export default async function DealsPage({ searchParams }) {
   const query = await searchParams;
   const page = query?.page ?? 1;
   const limit = query?.limit ?? 15;

   const { data: deals, pagination } = await getDeals(page, limit);

   return (
      <>
         <PageHeader name="Deals">
            <Link href="/new/deals">
               <AddNewButton>Add New Deal</AddNewButton>
            </Link>
         </PageHeader>

         <section className="m-8 flex-1">
            <DealsTable deals={deals} />
         </section>

         <PagePagination baseUrl="/deals" {...pagination} limit={limit} />
      </>
   );
}
