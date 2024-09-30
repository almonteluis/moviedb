export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export interface Language {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
    release_date: string;
    runtime?: number;
    budget: number;
    revenue: number;
    genres: Genre[];
    production_companies: ProductionCompany[];
    spoken_languages: Language[];
    genre_ids?: number[];
    // Add other properties as needed
}

export interface UpcomingMovie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    // Add other properties specific to upcoming movies if needed
}

export interface NowPlayingMovie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface NowPlayingResponse {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: NowPlayingMovie[];
    total_pages: number;
    total_results: number;
}