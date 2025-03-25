
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Filter, X, Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export interface FilterOption {
  id: string;
  name: string;
  options: string[];
}

interface InteractiveFilterProps {
  filterOptions: FilterOption[];
  onFilterChange: (filters: Record<string, string[]>) => void;
  className?: string;
}

const InteractiveFilter = ({ filterOptions, onFilterChange, className }: InteractiveFilterProps) => {
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [isOpen, setIsOpen] = useState(false);
  
  const handleFilterSelect = (filterId: string, option: string) => {
    setFilters(prev => {
      const currentOptions = prev[filterId] || [];
      const updatedOptions = currentOptions.includes(option)
        ? currentOptions.filter(o => o !== option)
        : [...currentOptions, option];
      
      return {
        ...prev,
        [filterId]: updatedOptions
      };
    });
  };
  
  const applyFilters = () => {
    onFilterChange(filters);
    setIsOpen(false);
  };
  
  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
    setIsOpen(false);
  };
  
  const getActiveFilterCount = () => {
    return Object.values(filters).flat().length;
  };
  
  return (
    <div className={className}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="relative">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {getActiveFilterCount() > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 px-1.5">
                {getActiveFilterCount()}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Filters</h4>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs"
                onClick={clearFilters}
              >
                Clear all
                <X className="ml-2 h-3 w-3" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {filterOptions.map((filter) => (
                <div key={filter.id} className="space-y-2">
                  <Label htmlFor={filter.id}>{filter.name}</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        id={filter.id}
                        variant="outline"
                        className="w-full justify-between"
                      >
                        {filters[filter.id]?.length
                          ? `${filters[filter.id].length} selected`
                          : "Select options"}
                        <Filter className="ml-2 h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      {filter.options.map((option) => (
                        <DropdownMenuItem
                          key={option}
                          onSelect={(e) => {
                            e.preventDefault();
                            handleFilterSelect(filter.id, option);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            {filters[filter.id]?.includes(option) && (
                              <Check className="h-4 w-4" />
                            )}
                            <span className={filters[filter.id]?.includes(option) ? "ml-0" : "ml-6"}>
                              {option}
                            </span>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default InteractiveFilter;
