import Link from 'next/link';
import { Movie } from '@/src/lib/types';

type MovieCardProps = {
    movie: Movie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
    return (
        <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <div
                className="h-64 bg-cover bg-center"
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})` }}
            ></div>
            <div className="p-4">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold text-white">{movie.title}</h1>
                    <ul className="flex items-center space-x-2 text-gray-400 text-sm mt-2">
                        <li>{movie.vote_average} /</li>
                    </ul>
                </div>
                <div className="mb-4 flex justify-between">
                    <h5 className="text-gray-400">SUMMARY</h5>
                    <ul className="flex items-center space-x-2 text-red-500">
                        <li>
                            <i className="material-icons">&#xE813;</i> -
                        </li>
                        <li>
                            <i className="material-icons">&#xE813;</i> -
                        </li>
                    </ul>
                </div>
                <div className="mb-4">
                    <p className="text-gray-300 text-sm">{movie.overview}</p>
                </div>
                <div className="mb-4">
                    <p className="text-gray-400 text-sm italic">-</p>
                </div>
                <div className="flex items-center justify-between">
                    <Link href={`/movies/${movie.id}`}>
                        <div className="border border-red-500 rounded-md px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white transition duration-300">
                            <h3 className="flex items-center space-x-2 text-sm font-medium">
                                <i className="material-icons">&#xE037;</i>
                                <span>WATCH TRAILER</span>
                            </h3>
                        </div>
                    </Link>
                    <div className="flex space-x-4">
                        <button className="text-red-500 hover:text-red-700 transition duration-300">
                            <i className="material-icons">&#xE161;</i>
                        </button>
                        <button className="text-red-500 hover:text-red-700 transition duration-300">
                            <i className="material-icons">&#xE866;</i>
                        </button>
                        <button className="text-red-500 hover:text-red-700 transition duration-300">
                            <i className="material-icons">&#xE80D;</i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;