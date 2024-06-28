import { Ticket } from "@prisma/client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import TicketStatus from "./ticket-status";
import TicketPriority from "./ticket-priority";
import Link from "next/link";
import { BiSolidMessageSquareDetail } from "react-icons/bi";

interface DataTableProps {
  tickets: Ticket[];
}

export default function DataTable({ tickets }: DataTableProps) {
  return (
    <div className="w-full my-5">
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>
                <div className="flex justify-center items-center">Status</div>
              </TableHead>
              <TableHead>
                <div className="flex justify-center items-center">Priority</div>
              </TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets
              ? tickets.map((ticket) => (
                  <TableRow key={ticket.id} data-href="/">
                    <TableCell className="flex items-center justify-start gap-5">
                      <Link href={`/tickets/${ticket.id}`}>
                        <BiSolidMessageSquareDetail className="text-2xl hover:opacity-75 transition-all" />
                      </Link>
                      {ticket.title}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center items-center">
                        <TicketStatus status={ticket.status} />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center items-center">
                        <TicketPriority priority={ticket.priority} />
                      </div>
                    </TableCell>
                    <TableCell>
                      {ticket.createdAt.toLocaleDateString("en-US", {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
