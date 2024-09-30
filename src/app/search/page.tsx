"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { searchMovies, fetchMovieGenres } from "@/src/lib/api";
import Layout from "@/src/components/Layout";
import SearchBar from "@/src/components/SearchBar";
import MovieCard from "@/src/components/MovieCard";
import { Movie, Genre } from "@/src/lib/types";

const SearchPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const fetchedGenres = await fetchMovieGenres();
        setGenres(fetchedGenres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();

    const query = searchParams.get('q');
    if (query) {
      handleSearch(query);
    }
  }, [searchParams]);

  const handleSearch = async (query: string) => {
    try {
      const data = await searchMovies(query);
      setMovies(data.results);
      router.push(`search?q=${encodeURIComponent(query)}`, {scroll: false});
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  return (
    <Layout>
      <div className="flex h-screen bg-gray-100">
        {/* sidebar */}
        <div className="w-64 bg-white shadow-md">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            {/* add filter components here */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor=""
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  name=""
                  id=""
                  className="mt-1 block w-full rounded-md broder-gray-300 shadow-sm focus:border-indigo-300 focus:ring"
                ></select>
                <option value="">All Categories</option>
                {genres.map((genre) => (
                  <option className="text-gray-700" key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 p-8">
          <h1>Search Movies</h1>
          <SearchBar onSearch={handleSearch} initialQuery={searchParams.get('q') || ''} />
          <div className="movie-grid flex justify-between flex-col flex-wrap">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
