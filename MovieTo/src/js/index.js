import Search from "./model/Search";
import { domElements } from "./view/base";
import * as movieView from "./view/movieView";

const search = new Search();
const controlSearch = async () => {
	await search.fetchMovies();
	await search.fetchRandomMovie();
	movieView.renderAllMovie(search.movies);
	movieView.renderRandomMovie(search.randomMovie);
};

window.addEventListener("load", controlSearch);

const controlPagination = async (pageToGo, target) => {
	console.log(pageToGo);
	if (search.page != pageToGo) {
		search.page = pageToGo;
		movieView.setDataBtn(pageToGo);
		movieView.selectButton(pageToGo, target);
		await search.fetchMovies(pageToGo);
		movieView.renderAllMovie(search.movies);
	}
};

domElements.pagination.addEventListener("click", (e) => {
	controlPagination(parseInt(e.target.dataset.goto, 10), e.target);
});
