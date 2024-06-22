import React from "react";
import { db } from "@/db";
import DataTable from "@/components/data-table";

export default async function Tickets() {
  const tickets = await db.ticket.findMany();

  return (
    <div>
      <DataTable tickets={tickets} />
    </div>
  );
}
