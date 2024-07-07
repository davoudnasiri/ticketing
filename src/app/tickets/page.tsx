import React from "react";
import { db } from "@/db";
import DataTable from "@/components/data-table";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Pagination from "@/components/pagination";
import { notFound } from "next/navigation";
import StatusFilter from "@/components/status-filter";
import { Ticket } from "@prisma/client";

export interface SearchParams {
  status?: string;
  page: string;
  orderBy: keyof Ticket;
  orderDir?: "asc" | "desc" | undefined;
}

const validStatuses = ["OPEN", "PROGRESSING", "CLOSED"];

export default async function Tickets({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const orderBy = searchParams.orderBy || "updatedAt";
  const orderDir = searchParams.orderDir || "desc";

  const status = validStatuses.includes(searchParams.status || "")
    ? searchParams.status
    : undefined;

  let where = {};
  if (status) {
    where = { status };
  } else {
    // where = { NOT: [{ status: "CLOSED" }] };
  }

  const ticketCount = await db.ticket.count({ where });
  const tickets = await db.ticket.findMany({
    where,
    orderBy: {
      [orderBy]: orderDir,
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  const maxPage = Math.ceil(ticketCount / pageSize);
  if (page < 1 || page > maxPage) {
    notFound();
  }

  return (
    <div>
      <div className="flex items-center justify-start gap-4">
        <Link
          href={"/tickets/new"}
          className={`${buttonVariants({
            variant: "default",
          })} text-background`}
        >
          New Ticket
        </Link>
        <StatusFilter />
      </div>
      <DataTable tickets={tickets} searchParams={searchParams} />
      <Pagination
        itemCount={ticketCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
}
