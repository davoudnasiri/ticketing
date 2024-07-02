import React from "react";
import { db } from "@/db";
import DataTable from "@/components/data-table";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Pagination from "@/components/pagination";
import { notFound } from "next/navigation";

interface SearchParams {
  searchParams: {
    page: string;
  };
}

export default async function Tickets({ searchParams }: SearchParams) {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const ticketCount = await db.ticket.count();
  const maxPage = Math.ceil(ticketCount / pageSize);

  if (page < 1 || page > maxPage) {
    notFound();
  }

  const tickets = await db.ticket.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  return (
    <div>
      <Link
        href={"/tickets/new"}
        className={`${buttonVariants({
          variant: "default",
        })} text-background`}
      >
        New Ticket
      </Link>
      <DataTable tickets={tickets} />
      <Pagination
        itemCount={ticketCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
}
