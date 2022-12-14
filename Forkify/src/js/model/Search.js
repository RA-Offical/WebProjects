import axios from "axios";
export default class Search {
	constructor(query) {
		this.query = query;
	}

	async getQueryResult() {
		try {
			const result = await axios(
				`https://forkify-api.herokuapp.com/api/search?q=${this.query}`
			);
			this.recipes = result.data.recipes;
		} catch (error) {
			alert("Search result not found");
		}
	}
}
