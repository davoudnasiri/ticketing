"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainNavLinks() {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Tickets", href: "/tickets" },
    { label: "Users", href: "/users" },
  ];

  const currentPath = usePathname();

  return (
    <div className="flex justify-center items-center gap-2">
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className={`navbar-link ${
            link.href === currentPath && "text-secondary-foreground"
          }
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
