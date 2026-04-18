import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export interface FilterOption<T extends string> {
  value: T;
  label: string;
}

export function useFilter<T extends string>(initialValue: T) {
  const [filterValue, setFilterValue] = useState<T>(initialValue);
  return { filterValue, setFilterValue };
}

interface FilterSelectProps<T extends string> {
  value: T;
  onChange: (val: T) => void;
  options: FilterOption<T>[];
  placeholder?: string;
}

export function FilterSelect<T extends string>({
  value,
  onChange,
  options,
  placeholder = "Filter",
}: FilterSelectProps<T>) {
  return (
    <div className="flex items-center gap-3 mr-4 bg-muted/30 px-4 py-2 rounded-2xl border border-border/50 shadow-sm backdrop-blur-sm">
      <Select value={value} onValueChange={(val) => onChange(val as T)}>
        <SelectTrigger className="w-[180px] p-5 text-lg rounded-xl border-input bg-background/80 shadow-sm font-medium hover:bg-accent/50 transition-colors">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="rounded-xl z-100 shadow-lg border-border/60">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="rounded-lg cursor-pointer my-0.5 p-4 text-lg capitalize"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
