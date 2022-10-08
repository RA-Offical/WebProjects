import Search from "./model/Search";
import * as searchView from "./view/searchView";
import * as recipeView from "./view/recipeView";
import * as listView from "./view/listView";
import * as likeView from "./view/likeView";
import { domElements, loadSpinner, clearSpinner } from "./view/base";
import Recipe from "./model/Recipe";
import List from "./model/List";
import Like from "./model/Like";

/**
 *     GLOBAL STATE OF THE APP
 */

const state = {};

/**
 *      SEARCH CONTROLLER
 */

const controlSearch = async () => {
	// 1) Getting query from the input field
	const query = searchView.getInput();
	if (query) {
		// 2) Creating new query object
		state.search = new Search(query);

		// 3) Preparing the UI
		searchView.clearInputField();
		searchView.clearSearchList();

		// 4) Render loader
		loadSpinner(domElements.result);

		try {
			// 5) Performing search to return all recipies related to the query
			await state.search.getQueryResult();

			// 6) Clear Spinner
			clearSpinner();

			// 7) Render results on the UI
			searchView.renderResults(state.search.recipes);
		} catch (error) {
			clearSpinner();
			alert("Search result not found");
		}
	}
};

// Handling Search event
domElements.searchForm.addEventListener("submit", (e) => {
	e.preventDefault();
	controlSearch();
});

// Handling pagination button events
domElements.pagination.addEventListener("click", (e) => {
	// 1) get the page in which we have to go
	const btn = e.target.closest(".btn-inline");
	if (btn) {
		const goto = parseInt(btn.dataset.goto, 10);
		// 2) Clear the result list
		searchView.clearSearchList();
		searchView.clearPaginationBtn();
		// 3) Render next page data
		searchView.renderResults(state.search.recipes, goto);
	}
});

/**
 * 	RECIPE CONTROLLER
 */

const controlRecipe = async () => {
	// Get the id of recipe
	const id = window.location.hash.replace("#", "");

	if (id) {
		// prepare UI for the recipe
		recipeView.clearRecipe();
		loadSpinner(domElements.recipe);
		// create new recipe object
		state.recipe = new Recipe(id);
		try {
			//highlight recipe
			if (state.search) searchView.highlightSelected(id);
			// fetch recipe from the api
			await state.recipe.getRecipe();

			// calculate serving and time
			state.recipe.calcTime();
			state.recipe.calcServing();

			// parse ingredients
			state.recipe.parseIngredients();

			//clear spinner
			clearSpinner();

			// render recipe on the page
			recipeView.renderRecipe(state.recipe, state.like.isLiked(id));
		} catch (error) {
			clearSpinner();
			alert("Error processing recipe");
		}
	}
};
// Handling recipe events
["load", "hashchange"].forEach((el) => {
	window.addEventListener(el, controlRecipe);
});

/**
 * 	LIST CONTROLLER
 */
const controlList = () => {
	// create the list object if it is not present
	// it is because we want to store all the ingredients
	// added to shopping list
	if (!state.list) state.list = new List();
	// add recipe to list
	state.recipe.ingredients.forEach((el) => {
		const item = state.list.addItem(el.count, el.unit, el.ingredient);
		listView.renderListItem(item);
	});
};

// Handling recipe button click event

domElements.recipe.addEventListener("click", (e) => {
	if (e.target.matches(".btn-decrease, .btn-decrease *")) {
		// decrease servings and ingredients
		if (state.recipe.serving > 1) {
			state.recipe.updateServing("dec");
			recipeView.updateServingIngredient(state.recipe);
		}
	} else if (e.target.matches(".btn-increase, .btn-increase *")) {
		// increase servings and ingredients
		state.recipe.updateServing("inc");
		recipeView.updateServingIngredient(state.recipe);
	} else if (e.target.matches(".recipe__btn--add, .recipe__btn--add *")) {
		// add ingredient to shopping
		controlList();
	} else if (e.target.matches(".recipe__love, .recipe__love *")) {
		// update the like view
		controlLike();
	}
});

// Handle delete and update list event
domElements.shoppingList.addEventListener("click", (e) => {
	const listItemId = e.target.closest(".shopping__item").dataset.itemid;
	if (e.target.matches(".shopping__delete, .shopping__delete *")) {
		// delete item from list
		state.list.deleteItem(listItemId);
		// delete item from UI
		listView.deleteListItem(listItemId);
	} //handle upadate count event
	else if (e.target.matches(".shopping__count-value")) {
		const value = parseFloat(e.target.value, 10);
		// update the count in list
		state.list.updateCount(listItemId, value);
	}
});

/**
 * 	LIKE CONTROLLER
 */

const controlLike = () => {
	if (!state.like) state.like = new Like();

	// getting current recipe id
	const id = state.recipe.id;
	// if the recipe is not already liked
	if (!state.like.isLiked(id)) {
		// add like to like list
		const like = state.like.addLike(
			id,
			state.recipe.title,
			state.recipe.author,
			state.recipe.img
		);
		// toogle the like view
		likeView.toogleLikeBtn(true);
		// render like on the UI
		likeView.renderLike(like);
	} //if the recipe is already liked
	else {
		//remove like from like list
		state.like.deleteLike(id);
		// toogle the like view
		likeView.toogleLikeBtn(false);
		// remove like from UI
		likeView.deleteLike(id);
	}
	likeView.toogleLikeMenu(state.like.getNumLikes());
};

// when page loads
window.addEventListener("load", () => {
	// create new like object
	state.like = new Like();
	// restore data into like array from local storage
	state.like.readStorage();
	//render all likes

	state.like.likes.forEach((el) => {
		likeView.renderLike(el);
	});
	// toogle the like menu
	likeView.toogleLikeMenu(state.like.getNumLikes());
});
