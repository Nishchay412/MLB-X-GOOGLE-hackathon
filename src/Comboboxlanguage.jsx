"use client";

import * as React from "react";
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

const frameworks = [
  {
    value: "English",
    label: "English",
  },
  {
    value: "Spanish",
    label: "Spanish",
  },
  {
    value: "French",
    label: "French",
  },
  {
    value: "Hindi",
    label: "Hindi",
  },
  {
    value: "Arabic",
    label: "Arabic",
  },
];

export function ComboboxLanguage({ onSelectLanguage }) {
  const [open, setOpen] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState("");

  // Handle selection
  const handleSelect = (currentValue) => {
    setSelectedLanguage(currentValue);
    setOpen(false);

    // Notify parent component
    if (onSelectLanguage) {
      onSelectLanguage(currentValue);
    }
  };

  // Log selected language when it changes
  React.useEffect(() => {
    if (selectedLanguage) {
      console.log("Selected language:", selectedLanguage);
    }
  }, [selectedLanguage]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          {selectedLanguage
            ? frameworks.find((framework) => framework.value === selectedLanguage)?.label
            : "Select Language..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={() => handleSelect(framework.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedLanguage === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
