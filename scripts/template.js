export function setRecipe(data) {
  const { id, image, name, ingredients, time, description, appliance, ustensils } = data;
  const picture = `recipes/${image}`

  const recipeArticle = document.createElement('article');
  const recipeImage = document.createElement('img');
  const recipeTime = document.createElement('p');
  const divText = document.createElement('div');
  const recipeName = document.createElement('h2');
  const recetteHead = document.createElement('h3');
  const recipeDescript = document.createElement('p');
  const ingredientHead = document.createElement('h3');
  const ingredientsList = document.createElement('ul');
  const ingredientsKWList = [];

  recipeArticle.setAttribute("id", id);
  recipeImage.setAttribute("src", picture);
  recipeTime.innerText = `${time}min`;
  recipeTime.className = "recipe-time";
  recipeName.innerText = name;
  recetteHead.innerText="recette";
  recipeDescript.innerText = description;
  ingredientHead.innerText = "ingrédients";
  

  
  for (const item of ingredients) {
    const {ingredient, quantity, unit} = item;
    ingredientsKWList.push(ingredient);
    const ingredientItem = document.createElement('li');
    const ingredientName = document.createElement('p');
    const ingredientQty = document.createElement('p');
    const unitv = document.createElement('p');
    ingredientName.innerText = ingredient;
    unitv.innerText = unit ? unit : ''; 
    if (unitv.innerText.length > 2) {
      unitv.innerText = ' ' + unit;
    } 
    ingredientQty.innerText = (quantity ? quantity : '') + unitv.innerText;
    ingredientItem.appendChild(ingredientName);
    ingredientItem.appendChild(ingredientQty);
    ingredientsList.appendChild(ingredientItem);
  };

  recipeArticle.appendChild(recipeImage);
  recipeArticle.appendChild(recipeTime);
  divText.appendChild(recipeName);
  divText.appendChild(recetteHead);
  divText.appendChild(recipeDescript);
  divText.appendChild(ingredientHead);
  divText.appendChild(ingredientsList);
  recipeArticle.appendChild(divText);
  
  return {recipeArticle, ingredientsKWList, appliance, ustensils};
}