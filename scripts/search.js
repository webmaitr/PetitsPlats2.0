
export function mainSearch (listOfRecipes) {
  //check if input
  const userInput = getUserInput();
  let mainSearchList;
  if (userInput) {
      mainSearchList = launchSearch(userInput, listOfRecipes);
    } 
    return mainSearchList;
}



//display error message if input less than 3 letters
function displayMessage (){
  const message = document.createElement('p');
  message.innerText = "Veuillez entrer au moins trois caractères";
  const searchContainer = document.querySelector('.search-container');
  searchContainer.parentElement.appendChild(message);
}

//delete error message
function deleteMessage (){
  const header = document.querySelector('header');
  const message = document.querySelector('header p');
  if (message) { 
    header.removeChild(message);
  }
}

//get the user's input
function getUserInput() {
  deleteMessage();
  const searchField = document.getElementById('search-field');
  const userInput = searchField.value;
  if (userInput.length >= 3) {
    console.log(userInput);
  } else {
    displayMessage();
    return;
  }
  return userInput
}


function launchSearch(userInput, initialList) {
  const newList=[]
  for (let i=0 ; i<initialList.length ; i++) {
    let titre = initialList[i].name;
    let descript = initialList[i].description;
    let allIngredients = sumIngredients(initialList[i]);
    if (titre.toLowerCase().includes(userInput.toLowerCase()) || descript.toLowerCase().includes(userInput.toLowerCase()) || allIngredients.toLowerCase().includes(userInput.toLowerCase()) ){
    newList.push(initialList[i]); 
    }  
  }

  return newList;

}



function sumIngredients (recipe) {
  let allIngredients ='';
  for (let item of recipe.ingredients) {
      allIngredients += (' ' + item.ingredient);
    }
  return allIngredients;
}

