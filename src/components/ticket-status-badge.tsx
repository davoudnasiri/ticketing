import React from "react";
import { Badge } from "./ui/badge";

interface TicketStatusBadgeProps {
  status: string;
}

const statusMap: Record<
  string,
  { label: string; color: "bg-blue-400" | "bg-yellow-400" | "bg-green-400" }
> = {
  OPEN: { label: "Open", color: "bg-blue-400" },
  IN_PROGRESS: { label: "Progressing", color: "bg-yellow-400" },
  CLOSED: { label: "Closed", color: "bg-green-400" },
};

export default function TicketStatusBadge({ status }: TicketStatusBadgeProps) {
  return (
    <Badge
      className={`${statusMap[status].color} text-background hover:${statusMap[status].color}`}
    >
      {statusMap[status].label}
    </Badge>
  );
}
