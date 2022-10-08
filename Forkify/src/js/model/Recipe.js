import axios from "axios";
export default class Recipe {
	constructor(id) {
		this.id = id;
	}

	async getRecipe() {
		const recipeResult = await axios(
			`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
		);
		this.author = recipeResult.data.recipe.publisher;
		this.img = recipeResult.data.recipe.image_url;
		this.url = recipeResult.data.recipe.source_url;
		this.title = recipeResult.data.recipe.title;
		this.ingredients = recipeResult.data.recipe.ingredients;
	}

	calcTime() {
		try {
			const totalIng = this.ingredients.length;
			const parts = Math.ceil(totalIng / 3);
			this.time = parts * 15;
		} catch (error) {
			alert("Error in fetching recipe");
		}
	}

	calcServing() {
		this.serving = 4;
	}

	parseIngredients() {
		const unitLong = [
			"teaspoons",
			"teaspoon",
			"tablespoons",
			"tablespoon",
			"ounces",
			"ounces",
			"cups",
			"pounds",
		];
		const unitShort = [
			"tbsp",
			"tbsp",
			"tsp",
			"tsp",
			"oz",
			"oz",
			"cup",
			"pound",
		];
		const newIngredients = this.ingredients.map((el) => {
			// Uniform Units
			let ingredient = el.toLowerCase();
			unitLong.forEach((el, index) => {
				ingredient = ingredient.replaceAll(el, unitShort[index]);
			});

			// Remove the parenthesis
			ingredient = ingredient.replaceAll(/ \([\s\S]*?\)/g, "");
			// Parse the ingredient into count, unit and ingredient
			let ingObj;
			const arrIng = ingredient.split(" ");
			const unitIndex = arrIng.findIndex((el) => unitShort.includes(el));

			// if unit is present in ingredient
			if (unitIndex > -1) {
				const arrCount = arrIng.slice(0, unitIndex);
				let count;
				if (arrCount.length === 1) {
					count = eval(arrCount.toString().replace("-", "+"));
				} else {
					count = eval(arrCount.join("+"));
				}

				ingObj = {
					count,
					unit: arrIng[unitIndex],
					ingredient: arrIng.slice(unitIndex + 1).join(" "),
				};
			} else if (parseInt(arrIng[0])) {
				// if unit is not present but it first element in ingredient is digit. i.e. 1 bread
				ingObj = {
					count: parseInt(arrIng[0]),
					unit: "",
					ingredient: arrIng.splice(1).join(" "),
				};
			} else if (unitIndex === -1) {
				// if there is not unit in ingredient and first digit in ingredient is not number
				ingObj = {
					count: 1,
					unit: "",
					ingredient,
				};
			}
			return ingObj;
		});
		this.ingredients = newIngredients;
	}

	updateServing(type) {
		// update servings
		const newServing = type === "dec" ? this.serving - 1 : this.serving + 1;
		// update ingredients
		this.ingredients.forEach((el) => {
			el.count *= newServing / this.serving;
		});
		this.serving = newServing;
	}
}
