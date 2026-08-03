"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PLANT_CATEGORIES } from "@/lib/validations/plant";

interface ComboboxProps {
  value: string;
  onChange: (value: string) => void;
  /** Show an "All Categories" option, used for filtering the plant list. */
  includeAllOption?: boolean;
  id?: string;
}

export function Combobox({
  value,
  onChange,
  includeAllOption = false,
  id,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const options = includeAllOption
    ? [{ value: "", label: "All Categories" }, ...PLANT_CATEGORIES.map((c) => ({ value: c, label: c }))]
    : PLANT_CATEGORIES.map((c) => ({ value: c, label: c }));
  const selected = options.find((cat) => cat.value === value)?.label;
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <Button
        id={id}
        type="button"
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="w-full justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {selected || "Select category..."}
        <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
      </Button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
          <div className="p-2">
            {options.map((cat) => (
              <div
                key={cat.value}
                className="flex items-center space-x-2 p-2 hover:bg-accent cursor-pointer rounded text-popover-foreground
                text-sm sm:text-base lg:text-lg"
                onClick={() => {
                  onChange(cat.value);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === cat.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {cat.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
