import { useState } from "react";
import SearchInterface from "./SearchInterface";
import FilterPanel from "./FilterPanel";
import ResultsDashboard from "./ResultsDashboard";

function Home() {
  const [mode, setMode] = useState<"business" | "scientific">("business");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log(`Searching for: ${query} in ${mode} mode`);
    // Here you would typically fetch results based on the query and mode
  };

  const handleModeChange = (newMode: "business" | "scientific") => {
    setMode(newMode);
    console.log(`Mode changed to: ${newMode}`);
    // Optionally refresh results based on the new mode
  };

  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  const handleApplyFilters = (filters: any) => {
    console.log("Applying filters:", filters);
    // Apply filters to the search results
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-background">
      <SearchInterface
        mode={mode}
        onSearch={handleSearch}
        onModeChange={handleModeChange}
        onFilterToggle={handleFilterToggle}
      />

      <div className="flex flex-1 overflow-hidden">
        {showFilters && (
          <div className="w-80 h-full">
            <FilterPanel
              mode={mode}
              onApplyFilters={handleApplyFilters}
              onResetFilters={() => console.log("Filters reset")}
              onClose={handleFilterToggle}
            />
          </div>
        )}

        <div className="flex-1 overflow-auto">
          <ResultsDashboard mode={mode} />
        </div>
      </div>
    </div>
  );
}

export default Home;
