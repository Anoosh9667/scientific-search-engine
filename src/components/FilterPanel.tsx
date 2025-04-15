import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { X } from "lucide-react";

interface FilterPanelProps {
  mode?: "business" | "scientific";
  onApplyFilters?: (filters: any) => void;
  onResetFilters?: () => void;
  onClose?: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  mode = "business",
  onApplyFilters = () => console.log("Filters applied"),
  onResetFilters = () => console.log("Filters reset"),
  onClose = () => console.log("Filter panel closed"),
}) => {
  const [yearRange, setYearRange] = useState<[number, number]>([2000, 2023]);
  const currentYear = new Date().getFullYear();

  const handleApplyFilters = () => {
    // Collect all filter values and pass them to the parent component
    const filters = {
      yearRange,
      // Add other filter values here
    };
    onApplyFilters(filters);
  };

  return (
    <div className="w-full h-full bg-white border-l p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Filters</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={["years", "keywords"]}
        className="space-y-4"
      >
        <AccordionItem value="years">
          <AccordionTrigger className="text-base font-medium">
            Publication Years
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="flex justify-between text-sm">
                <span>{yearRange[0]}</span>
                <span>{yearRange[1]}</span>
              </div>
              <Slider
                defaultValue={[yearRange[0], yearRange[1]]}
                max={currentYear}
                min={1900}
                step={1}
                onValueChange={(value) => setYearRange([value[0], value[1]])}
                className="my-4"
              />
              <div className="flex gap-2">
                <Input
                  type="number"
                  min={1900}
                  max={yearRange[1]}
                  value={yearRange[0]}
                  onChange={(e) =>
                    setYearRange([parseInt(e.target.value), yearRange[1]])
                  }
                  className="w-24"
                />
                <span className="self-center">to</span>
                <Input
                  type="number"
                  min={yearRange[0]}
                  max={currentYear}
                  value={yearRange[1]}
                  onChange={(e) =>
                    setYearRange([yearRange[0], parseInt(e.target.value)])
                  }
                  className="w-24"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="keywords">
          <AccordionTrigger className="text-base font-medium">
            Keywords
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              <Input placeholder="Add keywords separated by commas" />
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="bg-muted px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  Machine Learning
                  <X className="h-3 w-3 cursor-pointer" />
                </div>
                <div className="bg-muted px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  Neural Networks
                  <X className="h-3 w-3 cursor-pointer" />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {mode === "scientific" && (
          <AccordionItem value="methodology">
            <AccordionTrigger className="text-base font-medium">
              Methodology
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="quantitative" />
                  <Label htmlFor="quantitative">Quantitative</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="qualitative" />
                  <Label htmlFor="qualitative">Qualitative</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="mixed-methods" />
                  <Label htmlFor="mixed-methods">Mixed Methods</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="experimental" />
                  <Label htmlFor="experimental">Experimental</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="review" />
                  <Label htmlFor="review">Literature Review</Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {mode === "scientific" && (
          <AccordionItem value="impact-factor">
            <AccordionTrigger className="text-base font-medium">
              Impact Factor
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div className="flex justify-between text-sm">
                  <span>0</span>
                  <span>10+</span>
                </div>
                <Slider
                  defaultValue={[0, 10]}
                  max={10}
                  min={0}
                  step={0.1}
                  className="my-4"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {mode === "business" && (
          <AccordionItem value="business-relevance">
            <AccordionTrigger className="text-base font-medium">
              Business Relevance
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="strategy" />
                  <Label htmlFor="strategy">Strategy</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="innovation" />
                  <Label htmlFor="innovation">Innovation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="management" />
                  <Label htmlFor="management">Management</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="marketing" />
                  <Label htmlFor="marketing">Marketing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="finance" />
                  <Label htmlFor="finance">Finance</Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>

      <div className="flex gap-2 mt-6">
        <Button onClick={handleApplyFilters} className="flex-1">
          Apply Filters
        </Button>
        <Button variant="outline" onClick={onResetFilters}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;
