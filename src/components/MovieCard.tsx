"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Movie, Genre } from "@/src/lib/types";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddIcon from "@mui/icons-material/Add";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { formatDate, formatCurrency } from "../lib/utilitity";

type MovieCardProps = {
  movie: Movie;
  allGenres: Genre[];
};

const MovieCard = ({ movie, allGenres }: MovieCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getGenreNames = (genreIds: number[]) => {
    return genreIds
      .map((id) => allGenres.find((genre) => genre.id === id)?.name)
      .filter((name) => name !== undefined);
  };

  const genreNames = movie.genre_ids ? getGenreNames(movie.genre_ids) : [];

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  console.log(movie);

  return (
    <AnimatePresence>
      {!isExpanded ? (
        <motion.div
          className="h-[650px] bg-[#1e1b26] rounded-md shadow-lg overflow-hidden relative"
          layoutId={`movie-card-${movie.id}`}
        >
          {/* Existing card content */}
          <div
            className="w-full h-[380px] bg-cover bg-center rounded-t-md"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0.6) 85%, rgba(0,0,0,0) 100%)",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(30,27,38,0.88)] to-[#1e1b26]"></div>
          <div className="relative z-10 px-3">
            <h1 className="text-3xl font-normal text-[#e7e7e7] mb-2 line-clamp-1">
              {movie.title}
            </h1>
            <ul className="flex flex-row gap-1 text-sm">
              <li className="mb-2 text-gray-400">
                {formatDate(movie.release_date)}
              </li>
              <li className="mb-2 text-gray-400">{movie.vote_average}</li>
              <li className="mb-4 text-gray-400 line-clamp-1">
                {genreNames.join(", ")}
              </li>
              <li></li>
            </ul>
            <p className="text-sm text-gray-300 mb-4 line-clamp-4">
              {movie.overview}
            </p>
            <div className="flex justify-between items-center">
              <button
                onClick={handleExpand}
                className="border border-[#fe4141] rounded px-4 py-1 text-[#fe4141] hover:bg-[#fe4141] hover:text-white transition duration-300"
              >
                <h3 className="flex items-center text-sm font-normal">
                  <PlayArrowIcon className="material-icons text-xs mr-1" />
                  <span>WATCH TRAILER</span>
                </h3>
              </button>
              {/* ... other buttons ... */}
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          layoutId={`movie-card-${movie.id}`}
          className="fixed inset-0 bg-[#1e1b26] z-50 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="max-w-6xl mx-auto p-8">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white"
            >
              <CloseIcon />
            </button>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full rounded-lg shadow-lg"
                  width={300}
                  height={450}
                />
              </div>
              <div className="md:w-2/3 md:pl-8 mt-4 md:mt-0">
                <h1 className="text-4xl font-bold text-white mb-2">
                  {movie.title}
                </h1>
                {movie.tagline && (
                  <p className="text-xl text-gray-400 italic mb-4">
                    {movie.tagline}
                  </p>
                )}
                <p className="text-lg text-gray-300 mb-4">{movie.overview}</p>

                <div className="grid grid-cols-2 gap-4">
                  {movie.release_date && (
                    <div>
                      <h3 className="text-white font-semibold">Release Date</h3>
                      <p className="text-gray-400">
                        {formatDate(movie.release_date)}
                      </p>
                    </div>
                  )}
                  {movie.runtime && movie.runtime > 0 && (
                    <div>
                      <h3 className="text-white font-semibold">Runtime</h3>
                      <p className="text-gray-400">{movie.runtime} minutes</p>
                    </div>
                  )}
                  {movie.vote_average && (
                    <div>
                      <h3 className="text-white font-semibold">Rating</h3>
                      <p className="text-gray-400">
                        {movie.vote_average.toFixed(1)}/10 ({movie.vote_count}{" "}
                        votes)
                      </p>
                    </div>
                  )}
                  {genreNames.length > 0 && (
                    <div>
                      <h3 className="text-white font-semibold">Genres</h3>
                      <p className="text-gray-400">{genreNames.join(", ")}</p>
                    </div>
                  )}
                  {movie.budget > 0 && (
                    <div>
                      <h3 className="text-white font-semibold">Budget</h3>
                      <p className="text-gray-400">
                        {formatCurrency(movie.budget)}
                      </p>
                    </div>
                  )}
                  {movie.revenue > 0 && (
                    <div>
                      <h3 className="text-white font-semibold">Revenue</h3>
                      <p className="text-gray-400">
                        {formatCurrency(movie.revenue)}
                      </p>
                    </div>
                  )}
                </div>

                {movie.production_companies &&
                  movie.production_companies.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-white font-semibold mb-2">
                        Production Companies
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {movie.production_companies.map((company) => (
                          <span
                            key={company.id}
                            className="bg-gray-700 text-white px-2 py-1 rounded-full text-sm"
                          >
                            {company.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {movie.production_countries &&
                  movie.production_countries.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-white font-semibold mb-2">
                        Production Countries
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {movie.production_countries.map((country) => (
                          <span
                            key={country.iso_3166_1}
                            className="bg-gray-700 text-white px-2 py-1 rounded-full text-sm"
                          >
                            {country.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {movie.spoken_languages &&
                  movie.spoken_languages.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-white font-semibold mb-2">
                        Spoken Languages
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {movie.spoken_languages.map((language) => (
                          <span
                            key={language.iso_639_1}
                            className="bg-gray-700 text-white px-2 py-1 rounded-full text-sm"
                          >
                            {language.english_name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {movie.belongs_to_collection && (
                  <div className="mt-4">
                    <h3 className="text-white font-semibold mb-2">
                      Collection
                    </h3>
                    <p className="text-gray-400">
                      {movie.belongs_to_collection.name}
                    </p>
                  </div>
                )}

                {movie.homepage && (
                  <div className="mt-4">
                    <h3 className="text-white font-semibold mb-2">Homepage</h3>
                    <a
                      href={movie.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      {movie.homepage}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MovieCard;
