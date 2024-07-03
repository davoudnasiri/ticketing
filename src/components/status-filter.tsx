"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { buttonVariants } from "./ui/button";

const statuses: { label: string; value?: string }[] = [
  { label: "No Status Filter" },
  { label: "Open", value: "OPEN" },
  { label: "Progressing", value: "PROGRESSING" },
  { label: "Closed", value: "CLOSED" },
];

export default function StatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <label className="flex flex-col items-start justify-center gap-2">
      <select
        name="status"
        defaultValue={searchParams.get("status") || ""}
        onChange={(e) => {
          const status = e.target.value;
          const params = new URLSearchParams();

          if (status && status !== "0") {
            params.append("status", status);
          }

          const query = params.size ? `?${params.toString()}` : "";
          router.push(`/tickets${query}`);
        }}
        className={`rounded p-2 cursor-pointer dark:focus:!outline-black focus:!outline-white ${buttonVariants(
          {
            variant: "outline",
          }
        )}`}
      >
        {statuses.map((status) => (
          <option key={status.value || "0"} value={status.value || "0"}>
            {status.label}
          </option>
        ))}
      </select>
    </label>
  );
}
