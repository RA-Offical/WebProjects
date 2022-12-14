import { domElements } from "./base";
import { limitRecipeTitle } from "./searchView";

export const renderListItem = (item) => {
	const markup = `
        <li class="shopping__item" data-itemid="${item.id}">
            <div class="shopping__count" >
                <input type="number" value="${item.count}" step="${
		item.count
	}" class="shopping__count-value">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${limitRecipeTitle(
				item.ingredient
			)}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;
	domElements.shoppingList.insertAdjacentHTML("beforeend", markup);
};

export const deleteListItem = (id) => {
	const item = document.querySelector(`.shopping__item[data-itemid="${id}"]`);
	if (item) item.parentElement.removeChild(item);
};
