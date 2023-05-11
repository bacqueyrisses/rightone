"use client";
import { useEffect, useState } from "react";
import SearchButton from "@/components/ui/custom/SearchButton";
import SearchMenu from "@/components/ui/custom/SearchMenu";

export default function SearchControl({ words }: any) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <>
      <SearchButton onClick={() => setOpen(true)} />
      <SearchMenu open={open} onOpenChange={setOpen} value={words} />
    </>
  );
}
