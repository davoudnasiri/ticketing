"use client";

import { useState, useEffect, use } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, icons } from "lucide-react";
import { Button } from "./ui/button";

export default function ToggleMode() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const dark = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant={"outline"} size={"icon"} disabled={true}></Button>;
  }

  return (
    <Button
      className="hover:text-primary"
      variant={"outline"}
      size={"icon"}
      onClick={() => setTheme(`${dark ? "light" : "dark"}`)}
    >
      {dark ? <Sun /> : <Moon />}
    </Button>
  );
}
