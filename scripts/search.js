
export function mainSearch (listOfRecipes) {
  //check if input
  const userInput = getUserInput();
  let mainSearchList;
  if (userInput) {
      mainSearchList = launchSearch(userInput, listOfRecipes);
      if(mainSearchList.length === 0) {
        displayMessage(`Auncune recette ne contient '${userInput}' vous pouvez chercher "tarte aux pommes", "poisson", etc.`);
        return listOfRecipes;
      };
      return mainSearchList;
  } else {
    deleteMessage();
    return listOfRecipes;
  }
}



//display error message if input less than 3 letters
function displayMessage (myMessage){
  const message = document.createElement('p');
  message.innerText = myMessage;
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
    return userInput;
  } else {
    displayMessage("Veuillez entrer au moins trois caractères");
    return false;
  }
}


// function launchSearch(userInput, initialList) {
//   const newList=[]
//   for (let i=0 ; i<initialList.length ; i++) {
//     let titre = initialList[i].name;
//     let descript = initialList[i].description;
//     let allIngredients = sumIngredients(initialList[i]);
//     if (titre.toLowerCase().includes(userInput.toLowerCase()) || descript.toLowerCase().includes(userInput.toLowerCase()) || allIngredients.toLowerCase().includes(userInput.toLowerCase()) ){
//     newList.push(initialList[i]); 
//     }  
//   }
//   return newList;
// }

function launchSearch(userInput, initialList) {
  const newList = [];
  initialList.forEach((recipe) => {
    const firstList = Object.values(recipe);
    const secondList = firstList[4].map(element => element.ingredient);

    const finalString = firstList[2] + " " + firstList[6] + " " + secondList.join(" ");
    console.log(finalString);
    console.log(secondList);
    if (finalString.toLowerCase().includes(userInput.toLowerCase())) {
      newList.push(recipe);
    }
  })
  return newList;
}



// function sumIngredients (recipe) {
//   let allIngredients ='';
//   for (let item of recipe.ingredients) {
//       allIngredients += (' ' + item.ingredient);
//     }
//   return allIngredients;
// }

