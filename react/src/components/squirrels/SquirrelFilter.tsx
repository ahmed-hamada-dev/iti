import { type SquirrelType } from "../../lib/squirrels";
import { useFilter, FilterSelect, type FilterOption } from "../../hooks/useFilter";

export type SquirrelTypeFilter = SquirrelType | "all";

const squirrelFilterOptions: FilterOption<SquirrelTypeFilter>[] = [
  { value: "all", label: "All Types" },
  { value: "red", label: "Red" },
  { value: "gray", label: "Gray" },
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
  { value: "brown", label: "Brown" },
];

export function useSquirrelFilter() {
  return useFilter<SquirrelTypeFilter>("all");
}

export function SquirrelFilterSelect({
  value,
  onChange,
}: {
  value: SquirrelTypeFilter;
  onChange: (val: SquirrelTypeFilter) => void;
}) {
  return (
    <FilterSelect
      value={value}
      onChange={onChange}
      options={squirrelFilterOptions}
      placeholder="All Types"
    />
  );
}
