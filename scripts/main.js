import {recipes} from "/scripts/recipes.js";

import {setRecipe} from "/scripts/template.js";
import {setSearch} from "/scripts/search.js";

const display = document.querySelector(".recipes-display");


function displayRecipes (listOfRecipes) {
  listOfRecipes.forEach(recipe => {
    const article = setRecipe(recipe);
    display.appendChild(article); 
  });
}

function resetRecipes() {
  display.innerHTML = "";
}

displayRecipes(recipes);

const searchLens = document.getElementById('search-lens');
  searchLens.addEventListener("click", function() {
    const newList = setSearch(recipes);
    console.log(newList);
    resetRecipes();
    displayRecipes(newList);
  } );
