"use client";

import React from "react";
import { Button } from "./ui/button";
import {
  LuChevronFirst,
  LuChevronLeft,
  LuChevronRight,
  LuChevronLast,
} from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

export default function Pagination({
  itemCount,
  pageSize,
  currentPage,
}: PaginationProps) {
  const pageCount = Math.ceil(itemCount / pageSize);
  const router = useRouter();
  const searchParams = useSearchParams();

  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page === 1) {
      router.push("/tickets");
    } else {
      params.set("page", page.toString());
      router.push("?" + params.toString());
    }
  };

  return (
    <div>
      <div>
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => changePage(1)}
        >
          <LuChevronFirst />
        </Button>
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          <LuChevronLeft />
        </Button>
        <Button
          variant="outline"
          disabled={currentPage === pageCount}
          onClick={() => changePage(currentPage + 1)}
        >
          <LuChevronRight />
        </Button>
        <Button
          variant="outline"
          disabled={currentPage === pageCount}
          onClick={() => changePage(pageCount)}
        >
          <LuChevronLast />
        </Button>
      </div>
      <div>
        <p>
          page {currentPage} of {pageCount}
        </p>
      </div>
    </div>
  );
}
