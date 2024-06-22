import React from "react";
import Link from "next/link";
import ToggleMode from "./toggle-mode";
import MainNavLinks from "./main-nav-links";

export default function MainNav() {
  return (
    <div className="flex justify-between ">
      <MainNavLinks />
      <div className="flex justify-center items-center gap-2">
        <Link href="/users">Logout</Link>
        <ToggleMode />
      </div>
    </div>
  );
}
