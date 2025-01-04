"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "./lib/utils";
import { Button } from "./components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";

export function ComboboxDemo1({ onSelectTeam }) {
  const [open, setOpen] = React.useState(false);
  const [selectedTeam, setSelectedTeam] = React.useState(null); // State for the selected team
  const [value, setValue] = React.useState("");
  const [teams, setTeams] = React.useState([]); // Team list state

  // Fetch MLB teams when the component mounts
  React.useEffect(() => {
    const fetchTeams = async () => {
      try {
        // Fetch all MLB teams
        const response = await fetch(
          "https://statsapi.mlb.com/api/v1/teams?sportId=1"
        );
        const data = await response.json();

        // Extract team list and map to the dropdown format
        const teamList = data.teams.map((team) => ({
          value: team.id,
          label: team.name,
        }));

        setTeams(teamList);
      } catch (error) {
        console.error("Error fetching MLB teams:", error);
      }
    };

    fetchTeams();
  }, []);

  // Log changes to selectedTeam
  React.useEffect(() => {
    if (selectedTeam) {
      console.log("Updated selectedTeam:", selectedTeam);
    }
  }, [selectedTeam]);

  const handleSelect = (currentValue) => {
    setValue(currentValue === value ? "" : currentValue);
    setSelectedTeam(currentValue); // Update local state
    setOpen(false);

    // Notify parent component
    if (onSelectTeam) {
      onSelectTeam(currentValue);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between text-white bg-black"
        >
          {value
            ? teams.find((team) => team.value === value)?.label
            : "Select a team..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search teams..." />
          <CommandList>
            <CommandEmpty>No teams found.</CommandEmpty>
            <CommandGroup>
              {teams.map((team) => (
                <CommandItem
                  key={team.value}
                  value={team.value}
                  onSelect={() => handleSelect(team.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === team.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {team.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
