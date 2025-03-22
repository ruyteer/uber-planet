"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCountries } from "@/lib/use-countries";

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function CountrySelect({ value, onChange }: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const { countries, isLoading } = useCountries();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div className="flex items-center">
            {value && !isLoading ? (
              <>
                <img
                  src={
                    countries.find((country) => country.name === value)?.flag
                  }
                  className="mr-2  w-4"
                />

                {value}
              </>
            ) : (
              "Selecione um país"
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Buscar país..." />
          <CommandList>
            {isLoading ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                Carregando países...
              </div>
            ) : (
              <>
                <CommandEmpty>Nenhum país encontrado.</CommandEmpty>
                <CommandGroup className="max-h-64 overflow-y-auto">
                  {countries.map((country) => (
                    <CommandItem
                      key={country.code}
                      value={country.name}
                      onSelect={() => {
                        onChange(country.name);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === country.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <img src={country.flag} className="mr-2  w-4" />
                      {country.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
