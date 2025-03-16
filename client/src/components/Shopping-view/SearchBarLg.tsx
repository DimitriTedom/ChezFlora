import { GiPrayer } from "react-icons/gi";
import { HiCake } from "react-icons/hi";
import { GiLovers } from "react-icons/gi";
import { useState } from "react";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { BiGift } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { BsCalendar } from "react-icons/bs";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Calendar } from "@/components/ui/calendar";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const locations = [
  { value: "yaounde", label: "Yaoundé" },
  { value: "douala", label: "Douala" },
  { value: "maroua", label: "Maroua" },
  { value: "ebolowa", label: "Ebolowa" },
  { value: "bafoussam", label: "Bafoussam" },
];

const occasions = [
  {
    value: "wedding",
    label: "Mariage",
    icon: GiLovers,
    color: "pink-500",
  },
  {
    value: "birthday",
    label: "Anniversaire",
    icon: HiCake,
    color: "pink-500",
  },
  {
    value: "funeral",
    label: "Funérailles",
    icon: GiPrayer,
    color: "pink-500",
  },
  { value: "other", label: "Autre", icon: BsFillSearchHeartFill, color:"pink-500" },
];

const SearchBar = () => {
  const [location, setLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedOccasion, setSelectedOccasion] = useState<string>("");

  const handleSearch = () => {
    console.log({
      location,
      date: selectedDate,
      occasion: selectedOccasion,
    });
  };

  return (
    <div className="flex items-center px-8 py-4 bg-white rounded-full shadow-lg backdrop-blur-md">
      <div className="flex items-center space-x-4 w-full justify-between">
        {/* Location */}
        <Popover>
          <PopoverTrigger className="flex-1">
            <div className="flex items-center space-x-2 p-2 rounded-full hover:bg-pink-100 focus:bg-pink-100 transition duration-200">
              <CiLocationOn className="text-pink-500 w-6 h-6" />
              <div className="flex flex-col items-start">
                <span className="text-sm">
                  {location || "Choisir une localisation"}
                </span>
                <p className="text-sm font-semibold">Where?</p>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <Command>
              <CommandInput placeholder="Rechercher une ville..." />
              <CommandList>
                <CommandEmpty>Aucun résultat trouvé</CommandEmpty>
                <CommandGroup>
                  {locations.map((loc) => (
                    <CommandItem
                      key={loc.value}
                      onSelect={() => setLocation(loc.label)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          location === loc.label ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {loc.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Date Picker */}
        <Popover>
          <PopoverTrigger className="flex-1">
            <div className="flex items-center space-x-2 p-2 rounded-full hover:bg-pink-100 focus:bg-pink-100 transition duration-200">
              <BsCalendar className="text-pink-500 w-6 h-6" />
              <div className="flex flex-col items-start">
                <span className="text-sm">
                  {format(selectedDate, "MMMM do, yyyy")}
                </span>
                <p className="font-semibold text-sm">When?</p>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-full">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => setSelectedDate(date as Date)}
              // initialFocus
              className="rounded-lg border-pink-500 focus:border-pink-500"
            />
          </PopoverContent>
        </Popover>

        {/* Occasion */}
        <Popover>
          <PopoverTrigger className="flex-1">
            <div className="flex items-center space-x-2 p-2 rounded-full hover:bg-pink-100 focus:bg-pink-100 transition duration-200">
              <BiGift className="text-pink-500 w-6 h-6" />
              <div className="flex flex-col items-start">
                <div className="flex items-center">
                  <span className="text-sm">
                    {selectedOccasion || "Choisir une occasion"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-pink-500" />
                </div>
                <p className="font-semibold text-sm">For?</p>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <Command>
              <CommandList>
                {occasions.map((occasion) => (
                  <CommandItem
                    key={occasion.value}
                    onSelect={() => setSelectedOccasion(occasion.value)}
                    className="flex items-center space-x-2"
                  >
                    <occasion.icon
                      className={cn(
                        "w-5 h-5",
                        occasion.color ? `text-${occasion.color}` : "text-black"
                      )}
                    />
                    <span>{occasion.label}</span>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedOccasion === occasion.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Search Button */}
      <Button
        onClick={handleSearch}
        className="ml-4 bg-pink-500 text-white rounded-full p-3 hover:bg-pink-600 transition"
      >
        <BsFillSearchHeartFill className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default SearchBar;
