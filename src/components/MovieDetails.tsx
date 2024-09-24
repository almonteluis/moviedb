import { useRouter } from 'next/router';
import { Movie } from '@/src/lib/types';

const MovieDetails = () => {
    const router = useRouter();
    const { id } = router.query;

    // Fetch the movie details based on the id
    const movie: Movie = {
        id: 1,
        title: 'Movie Title',
        poster_path: '/path/to/poster.jpg',
        overview: 'Movie overview...',
        vote_average: 7.5,
        release_date: '',
        runtime: 0,
        budget: 0,
        revenue: 0,
        genres: [],
        production_companies: [],
        spoken_languages: []
    };

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
                    {/* Add more movie details */}
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;