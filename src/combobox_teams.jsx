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

export function ComboboxDemo({ onSelectPlayer }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [players, setPlayers] = React.useState([]); // Player list state

  // Fetch MLB teams and players when the component mounts
  React.useEffect(() => {
    const fetchTeamsAndPlayers = async () => {
      try {
        // Fetch all MLB teams
        const response = await fetch(
          "https://statsapi.mlb.com/api/v1/teams?sportId=1"
        );
        const data = await response.json();

        // Extract team list
        const teamList = data.teams;
        console.log("Teams:", teamList);

        // Collect players from all teams
        const allPlayers = [];
        for (const team of teamList) {
          const teamResponse = await fetch(
            `https://statsapi.mlb.com/api/v1/teams/${team.id}/roster`
          );
          const teamData = await teamResponse.json();

          // Add each player to the list
          teamData.roster.forEach((player) => {
            allPlayers.push({
              value: player.person.id,
              label: player.person.fullName,
            });
          });
        }

        // Set players in state
        setPlayers(allPlayers);
      } catch (error) {
        console.error("Error fetching MLB players:", error);
      }
    };

    fetchTeamsAndPlayers();
  }, []);

  const handleSelect = (currentValue) => {
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);
    if (onSelectPlayer) {
      onSelectPlayer(currentValue); // Call the parent callback
    }
    console.log("Selected value:", currentValue);
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
            ? players.find((player) => player.value === value)?.label
            : "Select a player..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search players..." />
          <CommandList>
            <CommandEmpty>No players found.</CommandEmpty>
            <CommandGroup>
              {players.map((player) => (
                <CommandItem
                  key={player.value}
                  value={player.value}
                  onSelect={() => handleSelect(player.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === player.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {player.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
