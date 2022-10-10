import axios from "axios";
export default class Search {
	constructor() {
		this.movies = [];
		this.page = 1;
	}

	async fetchMovies() {
		try {
			const result = await axios(
				`https://movieto-api.vercel.app/movie/all?page=${this.page}`
			);
			this.movies = result.data;
			console.log(this.movies);
		} catch (error) {
			console.log(
				"Cannot fetch movies. Check your internet connection and try again!"
			);
		}
	}

	async fetchRandomMovie() {
		try {
			const result = await axios("https://movieto-api.vercel.app/movie/");
			this.randomMovie = result.data;
			console.log(this.randomMovie);
		} catch (error) {
			console.log(
				"Cannot fetch movie. Please check your internet connection and try again!"
			);
		}
	}
}
