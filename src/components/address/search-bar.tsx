"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder,
  className,
}: SearchBarProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Buscar..."}
        className="pl-10 pr-10 py-2 h-10 bg-white"
        maxLength={100}
      />
      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-zinc-400 hover:text-zinc-600"
          onClick={() => onChange("")}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Limpar busca</span>
        </Button>
      )}
    </div>
  );
}
