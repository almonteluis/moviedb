"use client";
import { useState, useEffect } from "react";
import { searchMovies } from "@/src/lib/api";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Movie } from "@/src/lib/types";
import debounce from "lodash/debounce";
import Image from "next/image";

type SearchBarProps = {
  onSearch: (query: string) => void;
  initialQuery: string;
};

const SearchBar = ({ onSearch, initialQuery }: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [options, setOptions] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      handleInputChange(initialQuery);
    }
  }, [initialQuery]);

  const handleInputChange = debounce(async (value: string) => {
    setQuery(value);
    if (value.length > 2) {
      setLoading(true);
      try {
        const { results } = await searchMovies(value);
        setOptions(results);
      } catch (error) {
        console.error("Error searching movies:", error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    } else {
      setOptions([]);
    }
  }, 300);

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="relative">
      <Autocomplete
        freeSolo
        options={options}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.title
        }
        filterOptions={(x) => x}
        onInputChange={(event, value) => handleInputChange(value)}
        onChange={(event, value) => {
          if (typeof value === "string") {
            setQuery(value);
          } else if (value && "title" in value) {
            setQuery(value.title);
            onSearch(value.title);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search movies..."
            variant="outlined"
            className="w-full"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <span className="loading-indicator">Loading...</span>
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
              className: "bg-white text-black",
            }}
          />
        )}
        renderOption={(props, option) => (
          <li {...props}>
            <div className="flex items-center">
              {option.poster_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w92${option.poster_path}`}
                  alt={option.title}
                  width={48}
                  height={72}
                  className="object-cover mr-2"
                />
              )}
              <div>
                <div className="font-bold">{option.title}</div>
                <div className="text-sm text-gray-500">
                  {option.release_date
                    ? new Date(option.release_date).getFullYear()
                    : "N/A"}
                </div>
              </div>
            </div>
          </li>
        )}
      />
      <button
        onClick={handleSearch}
        className="absolute top-0 right-0 h-full px-4 py-2 text-white bg-blue-500 rounded-r-md focus:outline-none"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
