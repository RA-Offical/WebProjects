export const domElements = {
	searchForm: document.querySelector(".search"),
	searchField: document.querySelector(".search__field"),
	resultList: document.querySelector(".results__list"),
	result: document.querySelector(".results"),
	pagination: document.querySelector(".results__pages"),
	recipe: document.querySelector(".recipe"),
	shoppingList: document.querySelector(".shopping__list"),
	likeMenu: document.querySelector(".likes__field"),
	likeList: document.querySelector(".likes__list"),
};

export const domStrings = {
	loader: "loader",
};

export const loadSpinner = (parent) => {
	const loader = `
        <div class="loader">
            <svg>
                <use href="./img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
	parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearSpinner = () => {
	const loader = document.querySelector(`.${domStrings.loader}`);
	if (loader) loader.parentElement.removeChild(loader);
};
