import { Movie } from '@/src/lib/types';
import { Suspense } from 'react';
import { fetchMovieDetails } from '@/src/lib/api';

type MoviePageProps = {
    params: { id: string };
};

const MoviePage = async ({ params: { id } }: MoviePageProps) => {
    // Fetch the movie details based on the ID
    const movie: Movie = await fetchMovieDetails(id);

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
            <div className="flex">
                <div className="w-1/3">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full rounded-lg shadow-md"
                    />
                </div>
                <div className="w-2/3 pl-8">
                    <p className="text-lg mb-4">{movie.overview}</p>
                    <p className="text-gray-500">Rating: {movie.vote_average}</p>
                    <p className="text-gray-500">Release Date: {movie.release_date}</p>
                    <p className="text-gray-500">Runtime: {movie.runtime} minutes</p>
                    <p className="text-gray-500">Budget: ${movie.budget.toLocaleString()}</p>
                    <p className="text-gray-500">Revenue: ${movie.revenue.toLocaleString()}</p>
                    <div className="mt-4">
                        <h3 className="text-lg font-bold mb-2">Genres:</h3>
                        <ul className="list-disc pl-4">
                            {movie.genres.map((genre) => (
                                <li key={genre.id}>{genre.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-bold mb-2">Production Companies:</h3>
                        <ul className="list-disc pl-4">
                            {movie.production_companies.map((company) => (
                                <li key={company.id}>{company.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-bold mb-2">Spoken Languages:</h3>
                        <ul className="list-disc pl-4">
                            {movie.spoken_languages.map((language) => (
                                <li key={language.iso_639_1}>{language.english_name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoviePage;