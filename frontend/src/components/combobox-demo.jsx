import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "./ui/button";

const cities = [{ value: "boston", label: "Boston" }];

export function CityCombobox({ onSelect }) {
  // Accept onSelect prop
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSelectClick = () => setOpen(!open);

  const filteredCities = cities.filter((city) =>
    city.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative">
      <Button
        onClick={handleSelectClick}
        className="w-[140px] flex items-center justify-between bg-black/30 border border-white/10 text-white hover:bg-black/50 rounded-2xl px-4 py-2 text-sm transition-all"
      >
        {value
          ? cities.find((city) => city.value === value)?.label
          : "Select city"}
        <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
      </Button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-[220px] bg-[#1f1f1f]/90 backdrop-blur-md text-gray-200 border border-white/10 rounded-2xl p-3 shadow-xl z-50">
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Search city..."
              className="w-full px-3 py-2 bg-black/30 text-white border border-white/10 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <div
                    key={city.value}
                    className={`p-2 cursor-pointer hover:bg-white/10 rounded-lg transition-all ${
                      value === city.value ? "bg-white/10" : ""
                    }`}
                    onClick={() => {
                      setValue(city.value);
                      setOpen(false);
                      setSearchQuery("");
                      onSelect(city.label);
                    }}
                  >
                    <div className="flex items-center justify-between text-sm">
                      {city.label}
                      {value === city.value && (
                        <Check className="h-4 w-4 text-blue-400" />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500 text-center text-sm">
                  No city found
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
