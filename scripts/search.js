const newList = [];




//set event listener
export function setSearch(list){
    newList.splice(0);
    const userInput = getUserInput();
    if (userInput) {
      launchSearch(userInput, list);
      return newList;
    }
  };
    


function displayMessage (){
  const message = document.createElement('p');
  message.innerText = "Veuillez entrer au moins trois caractères";
  const searchContainer = document.querySelector('.search-container');
  searchContainer.parentElement.appendChild(message);
}

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
  const userSearch = searchField.value;
  if (userSearch.length >= 3) {
    console.log(userSearch);
  } else {
    displayMessage();
    return;
  }
  return userSearch
}


function launchSearch(userInput, initialList) {
 
  
  console.log(userInput);
  for (let i=0 ; i<initialList.length ; i++) {
    let titre = initialList[i].name;
    let descript = initialList[i].description;
    let allIngredients = sumIngredients(initialList[i]);
    if (titre.toLowerCase().includes(userInput.toLowerCase()) || descript.toLowerCase().includes(userInput.toLowerCase()) || allIngredients.toLowerCase().includes(userInput.toLowerCase()) ){
    newList.push(initialList[i]); 
    }  
  }
  // console.log(newList);
}



function sumIngredients (recipe) {
  let allIngredients ='';
  for (let item of recipe.ingredients) {
      allIngredients += (' ' + item.ingredient);
    }
  return allIngredients;
}

