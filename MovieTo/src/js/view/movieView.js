import { domElements } from "./base";
const renderMovie = (movie) => {
	const markup = `
        <div class="movie-container">
            <div class="movie">
                <img class="movie__img" src="${movie.img_url}" alt="">
                <h3 class="movie__name">${movie.name}</h3>
            </div>
            <span class="icon-contanier movie__add">
                <i class="fa-regular fa-plus icon"></i>
            </span>
        </div>
    `;
	domElements.movieGrid.insertAdjacentHTML("beforeend", markup);
};

export const renderAllMovie = (movies) => {
	domElements.movieGrid.innerHTML = "";
	movies.forEach(renderMovie);
};

export const renderRandomMovie = (movie) => {
	domElements.randomImg.setAttribute("src", movie.img_url);
	domElements.randomMovie.textContent = movie.name;
};

export const makeDisabled = (add) => {
	if (add === "add") {
		document.querySelector(".prev").classList.add("disabled");
	} else {
		document.querySelector(".prev").classList.remove("disabled");
	}
};

export const setDataBtn = (page) => {
	if (page > 1) {
		document.querySelector(".prev").dataset.goto = `${parseInt(page) - 1}`;
	}
	if (page > 9) {
		document.querySelector(".next").dataset.goto = `${parseInt(page) + 1}`;
	}
};

export const selectButton = (page, target) => {
	if (page >= 1 && page <= 9) {
		const btns = Array.from(document.querySelectorAll(".btn--pg-b"));
		btns.forEach((el) => el.classList.remove("btn--pg-active"));
		target.classList.add("btn--pg-active");
	}
};
