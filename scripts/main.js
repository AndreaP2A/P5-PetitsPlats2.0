import recipes from "./recipes.js";

const searchInput = document.querySelector(".hero__searchbar input");
console.log(searchInput); // This should log the input element
const recipeContainer = document.querySelector(".recipe__container");
console.log(recipes); // This should log the entire array of recipes

/**
 * Creates a recipe card article.
 *
 * @param {Object} recipe - The recipe object.
 * @param {string} recipe.name - The name of the recipe.
 * @param {string} recipe.image - The image filename of the recipe.
 * @param {string} recipe.description - The description of the recipe.
 * @param {Array} recipe.ingredients - The list of ingredients.
 * @param {string} recipe.ingredients[].ingredient - The name of the ingredient.
 * @param {number} [recipe.ingredients[].quantity] - The quantity of the ingredient.
 * @param {string} [recipe.ingredients[].unit] - The unit of the ingredient quantity.
 * @returns {HTMLElement} The recipe card element.
 */
function createRecipeCard(recipe) {
  const article = document.createElement("article");
  article.classList.add("recipe__card");

  article.innerHTML = `
        <div class="recipe__card__img">
            <img src="/assets/img/recipes/${recipe.image}" alt="${recipe.name}">
        </div> 
        <div class="recipe__content">
            <h2>${recipe.name}</h2>
            <div class="recipe__info">
                <h3>RECETTE</h3> 
                <p class="recipe__description">${recipe.description}</p> 
            </div>
            <div class="recipe__ingredients">
                <h3 class="recipe__ingredients__title">INGREDIENTS</h3>
                <div class="recipe__ingredients__list">
                    ${recipe.ingredients
                      .map(
                        (ingredient) => `
                        <div>
                            <p class="ingredient__name">${
                              ingredient.ingredient
                            }</p>
                            <p class="ingredient__quantity">${
                              ingredient.quantity || ""
                            } ${ingredient.unit || ""}</p> 
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
        </div>
    `;

  return article;
}

/**
 * Displays a list of recipes in the recipe container.
 *
 * This function clears the current content of the recipe container and
 * appends a card for each recipe in the provided array of recipes.
 *
 * @param {Object} recipesToDisplay - An object containing the array of recipes to display.
 * @param {Array} recipesToDisplay.array - The array of recipe objects to be displayed.
 */
function displayRecipes(recipesToDisplay = []) {
  recipeContainer.innerHTML = "";

  if (recipesToDisplay.length === 0) {
    recipeContainer.innerHTML = `<p>Aucune recette trouvée</p>`;
    return;
  }

  recipesToDisplay.forEach((recipe) => {
    const recipeCard = createRecipeCard(recipe);
    recipeContainer.appendChild(recipeCard);
  });
}

/**
 * Filters and displays recipes based on a search query (search bar).
 *
 * @param {string} query - The search query used to filter recipes.
 */
function searchRecipes(query) {
  const filteredRecipes = recipes.filter((recipe) => {
    const nameMatch = recipe.name.toLowerCase().includes(query.toLowerCase());
    const ingredientMatch = recipe.ingredients.some((ingredient) =>
      ingredient.ingredient.toLowerCase().includes(query.toLowerCase())
    );
    return nameMatch || ingredientMatch;
  });
  console.log("Filtered Recipes:", filteredRecipes); // Check filtered results
  displayRecipes(filteredRecipes);
}

/**
 * Event listener callback function to handle input by the user
 */
searchInput.addEventListener("input", (event) => {
  console.log("Input event triggered");
  const query = event.target.value;
  console.log("User input:", query);
  searchRecipes(query);
});

/**
 * Init
 */
displayRecipes(recipes);
