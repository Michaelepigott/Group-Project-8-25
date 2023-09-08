//puts elements into dom
input1el = document.getElementById("input-1");
input2el = document.getElementById("input-2");
input3el = document.getElementById("input-3");
input4el = document.getElementById("input-4");
inputbtnel = document.getElementById("input-btn");
var cocktailName = document.getElementById("drink-name");
var cocktailImage = document.getElementById("image");
var cocktailInstructions = document.getElementById("drink-instructions");
var cocktailIngredients = document.getElementById("drink-mi");
var historyEl = document.getElementById('hist-1');
var searchHistory = [];
//Array to import ingredients
var owned = [];
//gets inputs
function getinput(){
   owned.push(input1el.value);
   owned.push(input2el.value);
   owned.push(input3el.value);
   owned.push(input4el.value);
   //removes blank inputs from search
   input = owned.filter(checkblank);
   function checkblank(owned){
      return owned != '';
   };
   //joins array into one string
   var search = input.join(',');
   return search
   
}
// function to display drink saved in local storage in history
function renderSearchHistory() {
   historyEl.innerHTML = '';
   // for loop to show latest search input on top
   for (var i = searchHistory.length - 1; i >= 0; i--) {
       // creating button for each search item
      var Btn = document.createElement('button');
      // Btn needs to be styled with setting attributes
      Btn.classList.add('history-btn', 'btn-history');
      Btn.setAttribute('data-search', searchHistory[i]);
      Btn.textContent = searchHistory[i].strDrink;
      historyEl.append(Btn);
   }
}
// function to store the resulted drink object in an array
function setStorage(drink) {
   if (searchHistory.indexOf(drink) !== -1) {
       return;
   }
   searchHistory.push(drink);
   localStorage.setItem('search-history', JSON.stringify(searchHistory));
   renderSearchHistory();
   }

// function to get search history from local storage
function getStorage() {
var storageHistory = localStorage.getItem('suggestedDrink');
if (storageHistory) {
   searchHistory = JSON.parse(storageHistory);
}
renderSearchHistory();
}

//use ingredients to import api data as array
function getnamedata(){
   search = getinput();
   $.ajax({
      url: 'https://api.api-ninjas.com/v1/cocktail?ingredients=' + search,
      headers: {'X-APi-Key':'YPxVXKTw1N29WEkYJ7PSqw==3auVDgBW2b9DwHeP'},
      contentType: 'application/json',
      //code won't run until after the import is complete
      async: false,
   success: function(result) {
         //saves data to variable
         namearray = result;
         // run get name function with the resulted array
         getname(namearray)
         // return name array to be used globaly
         return namearray;
      },
      error: function ajaxError(jqXHR) {
   console.error('Error: ', jqXHR.responseText); 
      }
      
    });
}

//randomizes output from array
 function getname(namearray){
   randomnum = Math.floor(Math.random()*(10));
   console.log(randomnum);
   drinknameinfunction = namearray[randomnum].name;  
   // run api2 function with drinknameinfunction variable;
   api2(drinknameinfunction)
 };

 function api2(drinknameinfunction){
    // sets request url to search by drinkname
 var urlRequest = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
   
   var drinkname = drinknameinfunction.replace(" ","_");
   console.log(drinkname);
   fetch (urlRequest + drinkname)
      .then(function (response) {
         return response.json();
      })
      .then(function (data)  {
      if(!data.drinks) {
         // if result from getname doesn't match a data in api2 run function again to search for another match
         getname(namearray)
         // localStorage.setItem('suggestedDrink', JSON.stringify(data));
      return;
      }
      
   // return data.drinks
      console.log(data);
      console.log(data.drinks[0]);
      var myDrink = data.drinks[0];
      setStorage(myDrink)
   // returns cocktail's name
      cocktailName.innerHTML = myDrink.strDrink;
      console.log(myDrink.strDrink);
   // returns cocktail's image
      image.innerHTML = `
      <img src=${myDrink.strDrinkThumb}>
      `;
      console.log(myDrink.strDrinkThumb);
   // returns coctail's instructions
      cocktailInstructions.innerHTML = myDrink.strInstructions;
      console.log(myDrink.strInstructions);
      var count = 16;
   // creates string for ingredients and corresponding measurements to be displayed on screen
      var ingredients = [];
      console.log(myDrink)
   // for loop to tie correct measurement values to correct ingredient=======
      console.log(data);
      console.log(data.drinks[0]);
      var myDrink = data.drinks[0];
      console.log(myDrink.strDrink);
      console.log(myDrink.strDrinkThumb);
      console.log(myDrink.strInstructions);
      var count = 16;
      var ingredients = [];
      console.log(myDrink)
      /* for (var i=1; i<count; i++) {
         var measure = myDrink['strMeasure' + i];
         var ingredient = myDrink['strIngredient' + i];
         if(measure || ingredient) {
            ingredients.push(`${measure || ""} ${ingredient || ""}`.trim());
         }
      } 
      

         cocktailIngredients.innerHTML = ingredients;
         console.log(ingredients); */
         
         var ingredientsList = document.getElementById("drink-mi");
         for (var i = 1; i <= count; i++) {
            var measure = myDrink['strMeasure' + i];
            var ingredient = myDrink['strIngredient' + i];
    
            if (measure || ingredient) {
                ingredients.push(`${measure || ""} ${ingredient || ""}`.trim());
            }
            
        }
    
        // Create an <ul> element to hold the list of ingredients
        var ul = document.createElement("ul");
    
        // Populate the <ul> with <li> elements for each ingredient
        ingredients.forEach(function (ingredient) {
            var listItem = document.createElement("li");
            listItem.textContent = ingredient;
            ul.appendChild(listItem);
        });
    
        // Append the <ul> to the ingredientsList element
        ingredientsList.appendChild(ul);
   })
   };

   

getStorage();
function searchHistoryClick (e) {
   if (!e.target.matches('.btn-history')) {
       return;
   }
   var Btn = e.target;
   // this search variable is an object for the drink
   var search = Btn.getAttribute('data-search');
   // object need to be displayed when button is clicked
}


 //calls alll functions on button press
 inputbtnel.addEventListener('click', function(event){
   event.preventDefault();
   //call function (assign to user interface later)
   getnamedata();
   
   })
   historyEl.addEventListener('click', searchHistoryClick);
