"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Layout from "./../components/Layout";
import { fetchMovieDetails } from "@/src/lib/api";
import { Movie } from "@/src/lib/types";

export default function MovieDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchMovieDetails(params.id).then(setMovie);
    }
  }, [params.id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-2/3 md:pl-8 mt-4 md:mt-0">
            <p className="text-xl mb-4">{movie.overview}</p>
            <p className="mb-2">
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p className="mb-2">
              <strong>Rating:</strong> {movie.vote_average}/10
            </p>
            <p className="mb-2">
              <strong>Rating:</strong> {movie.runtime}/10
            </p>
            <p className="mb-4">
              <strong>Genres:</strong>{" "}
              {movie.genres?.map((g) => g.name).join(", ")}
            </p>
            <button
              onClick={() => router.back()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Back to Search
            </button>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
