"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { searchMovies, fetchMovieGenres } from "@/src/lib/api";
import Layout from "@/src/components/Layout";
import SearchBar from "@/src/components/SearchBar";
import MovieCard from "@/src/components/MovieCard";
import { Movie, Genre } from "@/src/lib/types";

const SearchPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchGenres = useCallback(async () => {
    try {
      const fetchedGenres = await fetchMovieGenres();
      setGenres(fetchedGenres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  }, []);

  const handleSearch = useCallback(
    async (query: string, genreId: string = "") => {
      setIsLoading(true);
      try {
        const data = await searchMovies(query);
        setMovies(data.results);
        const searchUrl = `search?q=${encodeURIComponent(query)}${
          genreId ? `&genre=${genreId}` : ""
        }`;
        router.push(searchUrl, { scroll: false });
      } catch (error) {
        console.error("Error searching movies:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const handleGenreChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newGenre = event.target.value;
      setSelectedGenre(newGenre);
      const currentQuery = searchParams.get("q");
      if (currentQuery) {
        handleSearch(currentQuery, newGenre);
      }
    },
    [searchParams, handleSearch]
  );

  const filteredMovies = useCallback(() => {
    if (selectedGenre) {
      return movies.filter((movie) =>
        movie.genre_ids?.includes(Number(selectedGenre))
      );
    }
    return movies;
  }, [movies, selectedGenre]);

  useEffect(() => {
    fetchGenres();
    const query = searchParams.get("q");
    const genre = searchParams.get("genre");
    if (query) {
      handleSearch(query, genre || "");
    }
    if (genre) {
      setSelectedGenre(genre);
    }
  }, [fetchGenres, handleSearch, searchParams]);

  return (
    <Layout>
      <div className="flex h-max bg-gray-100">
        <div className="w-64 bg-white shadow-md">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  value={selectedGenre}
                  onChange={handleGenreChange}
                  className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring"
                >
                  <option value="">All Categories</option>
                  {genres.map((genre) => (
                    <option
                      key={genre.id}
                      value={genre.id}
                      className="text-gray-700"
                    >
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 p-8 gap-4">
          <h1 className="text-2xl font-bold text-black">Search Movies</h1>
          <SearchBar
            onSearch={(query) => handleSearch(query, selectedGenre)}
            initialQuery={searchParams.get("q") || ""}
          />
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMovies().map((movie) => (
                <MovieCard key={movie.id} movie={movie} allGenres={genres} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
