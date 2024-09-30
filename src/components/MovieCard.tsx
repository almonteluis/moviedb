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
            {/* ... other existing content ... */}
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
          <div className="max-w-4xl mx-auto p-8">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white"
            >
              <CloseIcon />
            </button>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-2/3 md:pl-8 mt-4 md:mt-0">
                <h1 className="text-4xl font-bold text-white mb-4">
                  {movie.title}
                </h1>
                <p className="text-xl text-gray-300 mb-4">{movie.overview}</p>
                <p className="mb-2 text-gray-400">
                  <strong>Release Date:</strong> {movie.release_date}
                </p>
                <p className="mb-2 text-gray-400">
                  <strong>Rating:</strong> {movie.vote_average}/10
                </p>
                <p className="mb-4 text-gray-400">
                  <strong>Genres:</strong> {genreNames.join(", ")}
                </p>
                {/* Add more details here */}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MovieCard;
