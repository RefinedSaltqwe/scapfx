import { Input } from "@headlessui/react";
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
      className="bg-background text-primary focus:outline-primary block h-12 w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
    />
  );
};

export default memo(Search);
