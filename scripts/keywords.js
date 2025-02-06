

export function setDropDownLists () {
  const chevrons = document.querySelectorAll('.select>li:first-of-type img');
  
  chevrons.forEach((chevron) => {
    
    chevron.addEventListener("click", function (e) {
      const down = "assets/icons/chevron-down.svg";
      const up = "assets/icons/chevron-up.svg";
      const upperList = e.target.parentNode.parentNode;
      const handle = upperList.querySelector("li:nth-child(2)")
      const inputField = upperList.querySelector("input");
      const listKW = upperList.querySelector("ul");
      if (chevron.attributes.src.value === down) {
        handle.className = "list-open";
        chevron.attributes.src.value = up;
      } else {
        chevron.attributes.src.value = down;
        handle.className = "list-close";
        inputField.value = "";
        resetKWList(listKW.children);
      }
    })
  })
} 

function resetKWList(listKW) {
  for (let listItem of listKW) {
    if (listItem.className !== "search") {
      listItem.removeAttribute("class");
    }
  }
}

//simply close a drop-down list
function closeList(category) {
  const handle = document.querySelector(`.${category} li:nth-child(2)`);
  const chevron = document.querySelector(`.${category} li:first-child img`);
  const inputField = document.querySelector(`.${category} .search input`);
  const listKW = document.querySelector(`.${category} ul`);
  inputField.value = "";
  handle.className = "list-close";
  chevron.src = "assets/icons/chevron-down.svg";
  resetKWList(listKW.children);
}


//create lists of keywords
export function displayKW(list, category) {
  //create new set from list of keywords
  for  (let k in list) {
    list[k] = list[k].toLowerCase();
  }
  const setList = new Set(list);
  const arrayList = Array.from(setList);
  arrayList.sort();
  const categoryList = document.querySelector(`.${category} ul`);
  const categoryListItems = categoryList.querySelectorAll("li");
  //prior empty the drop-down list 
 
  for (let item of categoryListItems) {
      if (item.className !== "search") {item.remove()}
  }

  //fill the drop-down list with the set
  for (let item of arrayList) {
    const listItem = document.createElement("li");
    ;
    item = item[0].toUpperCase() + item.slice(1);
    listItem.innerText = item;
    categoryList.appendChild(listItem);

    const stamp = document.querySelectorAll(`.${category} .stamp`);
    if (stamp) {
      stamp.forEach((selectedKW) => {
        if (selectedKW.innerText === item) {listItem.remove()}
      })
    }
  }
    
  //init selection and display of keywords
  // setKWStamp(category);
  setKWInputSearch(list);
}


// create and display the stamp of selected keyword
export function displayKWStamp(category, listItem) {
  const upperKWList = document.querySelector(`.${category}`);
  const stampIcon = document.createElement("img");
  const stamp = document.createElement("li");
  stampIcon.setAttribute("src", "assets/icons/icon-cross.svg");
  stampIcon.setAttribute("alt", "");
  stamp.innerText = listItem.innerText;
  stamp.className = "stamp";
  stamp.appendChild(stampIcon);
  upperKWList.appendChild(stamp);
  listItem.remove();
  closeList(category);
  setCloseKWStamp(category, stamp, stampIcon);
}

function setCloseKWStamp(category, stamp, icon) {
  icon.addEventListener("click", function(){

    //putting back the keyword in the drop-down list with its listener
    const listItem = document.createElement("li");
    listItem.innerText = stamp.innerText;
    listItem.addEventListener("click", function () {
      displayKWStamp(category,listItem);
      })
    const listKW = document.querySelector(`.${category} ul`);

    insertAlphaOrder(listItem, listKW.children);

    stamp.remove();

  });   
}

function insertAlphaOrder(newListItem, list) {
  for (let listItem of list) {
     if (newListItem.innerText < listItem.innerText) {
         listItem.before(newListItem);
         break;
     }
  }
}


function setKWInputSearch () { 
  const kwInputFields = document.querySelectorAll(".search input");
 
  kwInputFields.forEach(kwInputField => {kwInputField.addEventListener("input", function(e) {
      let kwInput = e.target.value;
      kwInput = kwInput.toLowerCase();
      const initialList = e.target.parentElement.parentElement.children;
      const listKW = Array.from(initialList);
      if (kwInput.length>=3) {
          for (let listItem of listKW) {
            let listItemContent = listItem.innerText;
            listItemContent = listItemContent.toLowerCase();
            if (listItem.className !== "search" && listItemContent.includes(kwInput) === false) {
            listItem.className = "kwclosed";
            console.log(listItem);
            }
          }
      } else {resetKWList(listKW)}
    })
  })
}



const countCategorySelected = function () {
  let nbCategory = 0;
  const ingred = document.querySelectorAll(".ingred>li");
  const appli = document.querySelectorAll(".appar>li");
  const ustens = document.querySelectorAll(".ustens>li");
  if ((ingred.length > 2)) {nbCategory += 1};
  if ((appli.length > 2)) {nbCategory += 1};
  if ((ustens.length > 2)) {nbCategory += 1}; 

  return nbCategory;

}

//check if we have keywords already selected
export function checkKW(listOfRecipes) {
  const newList = []

  const kWNodeList = document.querySelectorAll(".stamp");

  if (kWNodeList.length !== 0) {
    for (let kw of kWNodeList) {
      let category = kw.parentElement.className.slice(7);
      let keyword = kw.innerText.toLowerCase();
      
      
      if (category === 'ingred') {
         const newListIngred = (sortRecipesByIngredient(listOfRecipes, keyword));
         newListIngred.forEach((element) => newList.push(element));
      } else if (category === 'appar') {
        const newListAppli = (sortRecipesByAppliance (listOfRecipes, keyword));
        newListAppli.forEach((element) => newList.push(element));
      } else if (category === 'ustens') {
        const newListUstens = (sortRecipesByUstensil (listOfRecipes, keyword));
        newListUstens.forEach((element) => newList.push(element));
      }
    }  
  } 

  
  
  if (kWNodeList.length === 1)  {
    return newList;
  } else if (kWNodeList.length > 1){ 
  
  let doublonList = [];
  let nb = 0;
  for (let i in newList) {
    for (let j in newList) {
      if (newList[i] === newList[j]) {
      nb++;
        if (nb === kWNodeList.length) {
          console.log(kWNodeList.length)
          console.log(newList[i]);
          doublonList.push(newList[i]);
        }
      }
    }
    nb = 0;
  }
  const finalList = new Set(doublonList);
  return finalList;
  } else {
    return listOfRecipes;
  }
}


function sortRecipesByIngredient (list, keyword) {
const newList = [];

  list.forEach ((element) => {
    const ingredientsList = element.ingredients;
    const listOfIngredients = [];

    ingredientsList.forEach((element) => {
      const ingred = element.ingredient.toLowerCase();
      listOfIngredients.push(ingred);    

    });
    
    if (listOfIngredients.includes(keyword)) {      
      newList.push(element);
    }
  });
  return newList;
}

function sortRecipesByAppliance (list, keyword) {
  const newList = [];
    list.forEach ((element) => {
  
      if (element.appliance.toLowerCase() === keyword) {
        newList.push(element); 
      }
    });
  return newList;
}

function sortRecipesByUstensil (list, keyword) {
  const newList = [];
    list.forEach ((element) => {
    
      const ustensilsList = element.ustensils.map((x) => x.toLowerCase());
        if (ustensilsList.includes(keyword)) {
          newList.push(element); 
        }
      });

  return newList;
}

