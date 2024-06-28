import React from "react";
import { db } from "@/db";
import DataTable from "@/components/data-table";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function Tickets() {
  const tickets = await db.ticket.findMany();

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
    </div>
  );
}
