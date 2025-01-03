export function setRecipe(data) {
  const { id, image, name, servings, ingredients, time, description, appliance, ustensils } = data;
  const picture = `recipes/${image}`

  const recipeArticle = document.createElement('article');
  const recipeImage = document.createElement('img');
  const divText = document.createElement('div');
  const recipeName = document.createElement('h2');
  const recetteHead = document.createElement('h3');
  const recipeDescript = document.createElement('p');
  const ingredientHead = document.createElement('h3');
  const ingredientsList = document.createElement('ul');

  recipeImage.setAttribute("src", picture);
  recipeName.innerText = name;
  recetteHead.innerText="recette";
  recipeDescript.innerText = description;
  ingredientHead.innerText = "ingrédients";
  
  for (const item of ingredients) {
    const {ingredient, quantity, unit} = item;
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
  divText.appendChild(recipeName);
  divText.appendChild(recetteHead);
  divText.appendChild(recipeDescript);
  divText.appendChild(ingredientHead);
  divText.appendChild(ingredientsList);
  recipeArticle.appendChild(divText);
  return recipeArticle;
}