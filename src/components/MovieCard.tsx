import Link from "next/link";
import { Movie } from "@/src/lib/types";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddIcon from "@mui/icons-material/Add";
import BookmarkIcon from "@mui/icons-material/Bookmark";

type MovieCardProps = {
  movie: Movie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="w-[375px] h-[650px] bg-[#1e1b26] rounded-md shadow-lg overflow-hidden relative">
      {/* <div className="absolute right-3 top-2 z-10">
                <i className="material-icons text-4xl text-[#fe4141] filter drop-shadow-lg">menu</i>
            </div> */}
      <div
        className="w-full h-[380px] bg-cover bg-center rounded-t-md"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0.6) 85%, rgba(0,0,0,0) 100%)",
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(30,27,38,0.88)] to-[#1e1b26]"></div>
      <div className="relative z-10 px-3 ">
        <h1 className="text-3xl font-normal text-[#e7e7e7] mb-2">
          {movie.title}
        </h1>
        <ul className="flex space-x-2 text-sm text-[#9b9b9b] font-semibold mb-3">
          <li>Action</li>
          <li>Adventure</li>
          <li>Sci-Fi</li>
        </ul>
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-xs font-normal text-[#e7e7e7]">SUMMARY</h5>
          <ul className="flex space-x-2 text-[#fe4141]">
            <li className="flex items-center">
              <FavoriteBorderIcon className="material-icons text-sm mr-1" />
              <span className="text-xs">{movie.vote_average}</span>
            </li>
            <li className="flex items-center">
              <CalendarMonthIcon className="material-icons text-sm mr-1" />
              <span className="text-xs">2h 49min</span>
            </li>
          </ul>
        </div>
        <p className="text-xs font-normal text-[#9b9b9b] mb-3 line-clamp-3">
          {movie.overview}
        </p>
        <p className="text-xs font-light text-[#e7e7e7] italic mb-4">
          Matthew McConaughey, Anne Hathaway, Jessica Chastain
        </p>
        <div className="flex justify-between items-center">
          <Link href={`/movies/${movie.id}`}>
            <div className="border border-[#fe4141] rounded px-4 py-1 text-[#fe4141] hover:bg-[#fe4141] hover:text-white transition duration-300">
              <h3 className="flex items-center text-sm font-normal">
                <PlayArrowIcon className="material-icons text-xs mr-1" />
                <span>WATCH TRAILER</span>
              </h3>
            </div>
          </Link>
          <div className="flex space-x-4">
            <button className="text-[#fe4141] hover:text-[#fe4141]/80 transition duration-300">
              <AddIcon className="material-icons text-2xl" />
            </button>
            <button className="text-[#fe4141] hover:text-[#fe4141]/80 transition duration-300">
              <FavoriteBorderIcon className="material-icons text-sm mr-1" />
            </button>
            <button className="text-[#fe4141] hover:text-[#fe4141]/80 transition duration-300">
              <BookmarkIcon className="material-icons text-sm mr-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
