'use client'
import React, { useEffect, useState } from 'react';
import { Movie } from '@/src/lib/types';
import { fetchMovieDetails } from '@/src/lib/api';

const Watchlist: React.FC = () => {
    const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchWatchlistMovies = async () => {
            // Retrieve the movieIds from local storage
            const watchlist = localStorage.getItem('watchlist');
            if (watchlist) {
                const movieIds = JSON.parse(watchlist);

                const moviePromises = movieIds.map((movieId: number) => fetchMovieDetails(movieId.toString()));
                const movies = await Promise.all(moviePromises);
                setWatchlistMovies(movies);
            }
        };

        fetchWatchlistMovies();
    }, []);

    return (
        <div>
            <h1>My Watchlist</h1>
            {watchlistMovies.length === 0 ? (
                <p>No movies in your watchlist.</p>
            ) : (
                <ul className='flex'>
                    {watchlistMovies.map((movie) => (
                        <li key={movie.id} className='w-1/3 p-5'>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <div>
                                <h2>{movie.title}</h2>
                                <p>{movie.overview}</p>
                            </div>
                            {/* Add more movie details as needed */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Watchlist;