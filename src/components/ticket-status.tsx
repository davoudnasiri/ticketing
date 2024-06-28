import React from "react";
import { Badge } from "./ui/badge";

interface TicketStatusProps {
  status: string;
}

const statusMap: Record<
  string,
  { label: string; color: "bg-blue-400" | "bg-yellow-400" | "bg-green-400" }
> = {
  OPEN: { label: "Open", color: "bg-blue-400" },
  PROGRESSING: { label: "Progressing", color: "bg-yellow-400" },
  CLOSED: { label: "Closed", color: "bg-green-400" },
};

export default function TicketStatus({ status }: TicketStatusProps) {
  return (
    <Badge
      className={`${statusMap[status].color} text-background hover:${statusMap[status].color} px-4 py-2`}
    >
      {statusMap[status].label}
    </Badge>
  );
}
