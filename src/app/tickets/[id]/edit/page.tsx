import React from "react";
import TicketForm from "@/components/ticket-form";
import { db } from "@/db";
import { notFound } from "next/navigation";

interface EditTicketProps {
  params: {
    id: string;
  };
}

export default async function EditTicket({ params }: EditTicketProps) {
  const ticket = await db.ticket.findFirst({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!ticket) {
    return notFound();
  }

  return (
    <div>
      <TicketForm ticket={ticket} />
    </div>
  );
}
