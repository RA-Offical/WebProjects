import { domElements } from "./base";

export const getInput = () => domElements.searchField.value;

export const clearInputField = () => {
	domElements.searchField.value = "";
};

export const clearSearchList = () => {
	domElements.resultList.innerHTML = "";
};

export const limitRecipeTitle = (title, limit = 18) => {
	const newTitle = [];
	if (title.length > limit) {
		title.split(" ").reduce((acc, cur) => {
			if (acc + cur.length <= limit) {
				newTitle.push(cur);
			}
			return acc + cur.length;
		}, 0);
		title = `${newTitle.join(" ")} ...`;
	}
	return title;
};

const renderRecipe = (recipe) => {
	const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
	domElements.resultList.insertAdjacentHTML("beforeend", markup);
};

export const clearPaginationBtn = () => {
	domElements.pagination.innerHTML = "";
};

const createBtn = (type, page) => `
	<button class="btn-inline results__btn--${type}" data-goto=${
	type === "prev" ? page - 1 : page + 1
}>
		<svg class="search__icon">
			<use href="img/icons.svg#icon-triangle-${
				type === "prev" ? "left" : "right"
			}"></use>
		</svg>
		<span>Page ${type === "prev" ? page - 1 : page + 1}</span>
	</button>
`;

const renderBtns = (page, resultPerPage, numResults) => {
	const pages = Math.ceil(numResults / resultPerPage);
	let button;
	if (page === 1 && pages > 1) {
		// 1) button to go next
		button = createBtn("next", page);
	} else if (page < pages) {
		// 2 Both buttons
		button = `
		${createBtn("next", page)}
		${createBtn("prev", page)}`;
	} else if (page === pages && pages > 1) {
		// 3) Button to go previous
		button = createBtn("prev", page);
	}
	domElements.pagination.insertAdjacentHTML("beforeend", button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
	const start = (page - 1) * resPerPage;
	const end = page * resPerPage;
	// rendering the recipes results
	recipes.slice(start, end).forEach(renderRecipe);
	// rendering pagination buttons
	renderBtns(page, resPerPage, recipes.length);
};

export const highlightSelected = (id) => {
	const searchResults = Array.from(
		document.querySelectorAll(".results__link--active")
	);
	searchResults.forEach((el) => el.classList.remove("results__link--active"));
	document
		.querySelector(`.results__link[href="#${id}"]`)
		.classList.add("results__link--active");
};
