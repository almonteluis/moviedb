"use client";
import React, { useEffect, useState } from "react";
import { UpcomingMovie, NowPlayingMovie } from "../../lib/types";
import { fetchUpcomingMovies, fetchNowPlayingMovies } from "../../lib/api";
import { formatDate } from "../../lib/utilitity";
import WatchlistButton from "../../components/WatchlistButton";
import Link from "next/link";
import Image from "next/image";

const UpcomingMovies: React.FC = () => {
  const [upcomingMovies, setUpcomingMovies] = useState<UpcomingMovie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<NowPlayingMovie[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const upcomingData = await fetchUpcomingMovies();
        const nowPlayingData = await fetchNowPlayingMovies();

        if (Array.isArray(upcomingData)) {
          setUpcomingMovies(upcomingData);
        } else {
          console.error("Fetched upcoming data is not an array:", upcomingData);
        }

        if (Array.isArray(nowPlayingData)) {
          setNowPlayingMovies(nowPlayingData);
        } else {
          console.error(
            "Fetched now playing data is not an array:",
            nowPlayingData
          );
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Failed to fetch movies. Please try again later.");
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>Now Playing</h2>
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        {nowPlayingMovies.map((movie) => (
          <div key={movie.id} className="p-4">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto mb-2"
            />
            <h3>{movie.title}</h3>
            <p>Release Date: {formatDate(movie.release_date)}</p>
            <Link href={`/movies/${movie.id}`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                Details
              </button>
            </Link>
            <WatchlistButton movieId={movie.id} />
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold underline">Upcoming Films</h2>
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        {upcomingMovies.map((movie) => (
          <div key={movie.id} className="p-4">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>Release Date: {formatDate(movie.release_date)}</p>
            <Link href={`/movies/${movie.id}`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                Details
              </button>
            </Link>
            <WatchlistButton movieId={movie.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMovies;
