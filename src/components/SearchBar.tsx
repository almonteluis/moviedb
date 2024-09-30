"use client";
import { useState, useEffect } from "react";
import { searchMovies } from "@/src/lib/api";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Movie } from "@/src/lib/types";

type SearchBarProps = {
  onSearch: (query: string) => void;
  initialQuery: string;
};

const SearchBar = ({ onSearch, initialQuery }: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [options, setOptions] = useState<(Movie | string)[]>([]);

  useEffect(() => {
    if (initialQuery) {
      handleInputChange({} as React.ChangeEvent<{}>, initialQuery);
    }
  }, [initialQuery]);

  const handleInputChange = async (
    event: React.ChangeEvent<{}>,
    value: string
  ) => {
    setQuery(value);
    if (value.length > 2) {
      try {
        const { results } = await searchMovies(value);
        setOptions(results);
      } catch (error) {
        console.error("Error searching movies:", error);
        setOptions([]);
      }
    } else {
      setOptions([]);
    }
  };

  const handleSearch = () => {
    onSearch(query);
  };

  const getOptionLabel = (option: Movie | string) => {
    if (typeof option === "string") {
      return option;
    } else {
      return option.title;
    }
  };

  return (
    <div className="relative">
      <Autocomplete
        freeSolo
        options={options}
        getOptionLabel={getOptionLabel}
        onChange={(event, value) =>
          setQuery(typeof value === "string" ? value : value?.title || "")
        }
        onInputChange={handleInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search movies..."
            variant="outlined"
            className="w-full"
            InputProps={{
              className: "bg-white text-black", // Custom CSS class for input field
            }}
          />
        )}
      />
      <button
        onClick={handleSearch}
        className="absolute top-0 right-0 px-4 py-2 text-white bg-blue-500 rounded-r-md focus:outline-none"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
