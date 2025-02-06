import {recipes} from "/scripts/recipes.js";

import {setRecipe} from "/scripts/template.js";
import {mainSearch} from "/scripts/search.js";
import {setDropDownLists, displayKW, displayKWStamp, checkKW} from "/scripts/keywords.js";

const display = document.querySelector(".recipes-display");



function displayRecipes (listOfRecipes) {
  const listOfIngredient = [];
  const listOfAppliance = [];
  const listOfUstensil = [];
  listOfRecipes.forEach(recipe => {
    const articleModel = setRecipe(recipe);
    const article = articleModel.recipeArticle;
    display.appendChild(article);
    
    //set the lists of KW from the recipes to be displayed
    listOfIngredient.push(articleModel.ingredientsKWList);
    listOfAppliance.push(articleModel.appliance);
    listOfUstensil.push(articleModel.ustensils);
  });

  //display the lists of KW
  displayKW(listOfAppliance, "appar");
  displayKW(listOfUstensil.flat(), "ustens");
  displayKW(listOfIngredient.flat(), "ingred");
  countRecipes();
  return listOfRecipes;
}

function resetRecipes() {
  display.innerHTML = "";
}

function countRecipes () {
  const totalOfRecipes = document.querySelector(".nb-recettes");
  const listRecipes = document.querySelectorAll("article");
  
  if (listRecipes.length === 1) {
    totalOfRecipes.innerText = listRecipes.length + " " + "recette";
  } else if (listRecipes.length === 0) {
    totalOfRecipes.innerText = "pas de recettes";
  } else {
  totalOfRecipes.innerText = listRecipes.length + " " + "recettes";
}
}



const searchLens = document.getElementById('search-lens');

function sortRecipes (list) {
    const kWNodeList = document.querySelectorAll(".stamp");
    resetRecipes();
  if (searchLens.previousElementSibling.value === "") {
    const listOfRecipes = displayRecipes(recipes);
    const finalList = checkKW(listOfRecipes);
    resetRecipes();
    displayRecipes(finalList);
    setKWStamp();
    
  } else {
    const newList = mainSearch(list);
    const listOfRecipes = displayRecipes(newList);
    setKWStamp();
     if (kWNodeList.length !== 0) {
    const finalList = checkKW(listOfRecipes);
    resetRecipes();
    displayRecipes(finalList);
    setKWStamp();
    }
  }
}

function setMainSearch (list) {
  searchLens.addEventListener("click", function() {
    sortRecipes(list);
  })
}

function closeStamp () {
  const iconsClose = document.querySelectorAll(".stamp img");
  iconsClose.forEach((iconClose) => {
    iconClose.addEventListener("click", function () {
      console.log("click");
      const list = checkKW(recipes);
      sortRecipes(list);
      });
  })
}

function setKWStamp () {
  const listKWs = document.querySelectorAll(".select ul");
  listKWs.forEach((listKW) => {
    for (let listItem of listKW.children) {
      if (listItem.className !== "search") {
        listItem.addEventListener("click", function (e) {
          const category = e.target.parentNode.parentNode.parentNode.className.slice(7);
          displayKWStamp(category, listItem);
          sortRecipes(recipes);
          closeStamp();
        })
      }
    }
  }) 
}

//display the very first list of recipes - no filter
displayRecipes(recipes);
setMainSearch(recipes);
setDropDownLists();
setKWStamp();



