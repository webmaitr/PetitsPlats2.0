import {recipes} from "/scripts/recipes.js";

import {setRecipe} from "/scripts/template.js";


const display = document.querySelector(".recipes-display");


function displayRecipes (listOfRecipes) {
  listOfRecipes.forEach(recipe => {
    const article = setRecipe(recipe);
    display.appendChild(article); 
  });
}

displayRecipes(recipes)
