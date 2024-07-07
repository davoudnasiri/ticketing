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
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { SearchParams } from "@/app/tickets/page";

interface DataTableProps {
  tickets: Ticket[];
  searchParams: SearchParams;
}

const getNextOrderParams = (
  currentOrderBy: keyof Ticket | undefined,
  currentDir: "asc" | "desc" | undefined,
  column: keyof Ticket
): Partial<SearchParams> => {
  if (currentOrderBy !== column) {
    return { orderBy: column, orderDir: "asc" };
  } else if (currentDir === "asc") {
    return { orderBy: column, orderDir: "desc" };
  } else if (currentDir === "desc") {
    return { orderBy: undefined, orderDir: undefined };
  } else {
    return { orderBy: column, orderDir: "asc" };
  }
};

export default function DataTable({ tickets, searchParams }: DataTableProps) {
  const createLink = (column: keyof Ticket) => {
    const nextOrderParams = getNextOrderParams(
      searchParams.orderBy,
      searchParams.orderDir,
      column
    );

    const query: Partial<SearchParams> = {
      ...searchParams,
      ...nextOrderParams,
    };

    if (!query.orderBy) delete query.orderBy;
    if (!query.orderDir) delete query.orderDir;

    return { pathname: "/tickets", query };
  };

  return (
    <div className="w-full my-5">
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Link href={createLink("title")}>Title</Link>
                {searchParams.orderBy === "title" &&
                  (searchParams.orderDir === "asc" ? (
                    <FaArrowUp className="inline ml-2" />
                  ) : searchParams.orderDir === "desc" ? (
                    <FaArrowDown className="inline ml-2" />
                  ) : null)}
              </TableHead>
              <TableHead>
                <div className="flex justify-center items-center">
                  <Link href={createLink("status")}>Status</Link>
                  {searchParams.orderBy === "status" &&
                    (searchParams.orderDir === "asc" ? (
                      <FaArrowUp className="inline ml-2" />
                    ) : searchParams.orderDir === "desc" ? (
                      <FaArrowDown className="inline ml-2" />
                    ) : null)}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex justify-center items-center">
                  <Link href={createLink("priority")}>Priority</Link>
                  {searchParams.orderBy === "priority" &&
                    (searchParams.orderDir === "asc" ? (
                      <FaArrowUp className="inline ml-2" />
                    ) : searchParams.orderDir === "desc" ? (
                      <FaArrowDown className="inline ml-2" />
                    ) : null)}
                </div>
              </TableHead>
              <TableHead>
                <Link href={createLink("createdAt")}>Created At</Link>
                {searchParams.orderBy === "createdAt" &&
                  (searchParams.orderDir === "asc" ? (
                    <FaArrowUp className="inline ml-2" />
                  ) : searchParams.orderDir === "desc" ? (
                    <FaArrowDown className="inline ml-2" />
                  ) : null)}
              </TableHead>
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
