import { Flame } from "lucide-react";
import React from "react";

interface TicketPriorityProps {
  priority: string;
}

const priorityMap: Record<string, { label: string; level: 1 | 2 | 3 }> = {
  3: { label: "High", level: 3 },
  2: { label: "Medium", level: 2 },
  1: { label: "Low", level: 1 },
};

export default function TicketPriority({ priority }: TicketPriorityProps) {
  return (
    <div className="flex justify-between items-center">
      <Flame
        className={`${
          priorityMap[priority].level >= 1 ? "text-red-500" : "text-muted"
        }`}
      />
      <Flame
        className={`${
          priorityMap[priority].level >= 2 ? "text-red-500" : "text-muted"
        }`}
      />
      <Flame
        className={`${
          priorityMap[priority].level >= 3 ? "text-red-500" : "text-muted"
        }`}
      />
    </div>
  );
}
