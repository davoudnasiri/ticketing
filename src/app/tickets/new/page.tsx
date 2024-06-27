import React from "react";
import TicketForm from "@/components/ticket-form";
import dynamic from "next/dynamic";

// const TicketForm = dynamic(() => import("@/components/ticket-form"), {
//   ssr: false,
// });

export default function CreateTicket() {
  return (
    <div>
      <TicketForm />
    </div>
  );
}
