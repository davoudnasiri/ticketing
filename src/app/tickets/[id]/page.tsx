import React from "react";
import { db } from "@/db";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TicketStatus from "@/components/ticket-status";
import TicketPriority from "@/components/ticket-priority";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

interface SingleTicketProps {
  params: {
    id: string;
  };
}

export default async function SingleTicket({ params }: SingleTicketProps) {
  const ticket = await db.ticket.findFirst({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!ticket) {
    return notFound();
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between pb-3">
          <TicketStatus status={ticket.status} />
          <TicketPriority priority={ticket.priority} />
        </div>
        <CardTitle>{ticket.title}</CardTitle>
        <CardDescription>
          Created:{" "}
          {ticket.createdAt.toLocaleDateString("en-US", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "numeric",
            minute: "2-digit",
            hour12: false,
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className="opacity-75">{ticket.description}</CardContent>
      <CardFooter>
        Updated:{" "}
        {ticket.updatedAt.toLocaleDateString("en-US", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
        })}
      </CardFooter>
      <div className="flex items-center justify-start gap-4 p-4">
        <Link
          href={`/tickets/${ticket.id}/edit`}
          className={`${buttonVariants({
            variant: "secondary",
          })} border border-input`}
        >
          Edit Ticket
        </Link>
        <Link
          href={`/tickets/${ticket.id}/edit`}
          className={`${buttonVariants({ variant: "destructive" })}`}
        >
          Delete Ticket
        </Link>
      </div>
    </Card>
  );
}
