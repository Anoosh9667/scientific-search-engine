import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchInterfaceProps {
  mode?: "business" | "scientific";
  onSearch?: (query: string) => void;
  onModeChange?: (mode: "business" | "scientific") => void;
  onFilterToggle?: () => void;
}

const SearchInterface: React.FC<SearchInterfaceProps> = ({
  mode = "business",
  onSearch = () => console.log("Search triggered"),
  onModeChange = (newMode) => console.log(`Mode changed to ${newMode}`),
  onFilterToggle = () => console.log("Filter toggle clicked"),
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="w-full bg-white p-4 shadow-sm border-b">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Research Engine</h1>
        <Select
          value={mode}
          onValueChange={(value: "business" | "scientific") =>
            onModeChange(value)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="business">Business Mode</SelectItem>
            <SelectItem value="scientific">Scientific Mode</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search for papers, authors, keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
        </div>
        <Button type="submit">Search</Button>
        <Button
          type="button"
          variant="outline"
          onClick={onFilterToggle}
          className="flex items-center gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </form>
    </div>
  );
};

export default SearchInterface;
