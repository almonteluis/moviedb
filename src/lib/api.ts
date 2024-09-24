import axios from "axios";
import { API_KEY, API_BASE_URL } from "./config";
import {
  UpcomingMovie,
  NowPlayingMovie,
  NowPlayingResponse,
  Genre,
} from "./types";

export const searchMovies = async (query: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: query,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

export const fetchMovieGenres = async (): Promise<Genre[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.genres;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const fetchUpcomingMovies = async (): Promise<UpcomingMovie[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/upcoming`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

export const fetchNowPlayingMovies = async (): Promise<NowPlayingMovie[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/now_playing`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    throw error;
  }
};
