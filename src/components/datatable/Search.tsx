import { Input } from "@/components/ui/input";
import React, { memo } from "react";

type SearchProps = {
  globalFilterString?: string;
  searchFilter?: (val: string) => void;
  placeholder?: string;
};

const Search: React.FC<SearchProps> = ({
  searchFilter,
  globalFilterString = "", // Default value
  placeholder,
}) => {
  // Type the event explicitly to ensure `value` is treated as a string
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchFilter?.(event.target.value); // Now, `event.target.value` is correctly inferred as a string
  };

  return (
    <Input
      placeholder={placeholder ?? "Search..."}
      value={globalFilterString}
      onChange={handleChange} // Use the typed handler
      className="splash-base-input splash-inputs flex flex-1 placeholder:text-gray-400 dark:placeholder:text-gray-600"
    />
  );
};

export default memo(Search);
