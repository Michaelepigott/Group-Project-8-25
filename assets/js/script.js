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


//gets inputs
function getinput(){
   //Array to import ingredients
   var owned = [];
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
      Btn.setAttribute('data-search', JSON.stringify(searchHistory[i]));
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
var storageHistory = localStorage.getItem('search-history');
console.log(storageHistory)
if (storageHistory) {
   searchHistory = JSON.parse(storageHistory);
   
}
renderSearchHistory();
}

// Get the h1 element by its ID
var titleElement = document.getElementById("drinkoligist-title");

// Function to dim the h1 on hover
titleElement.addEventListener("mouseenter", function () {
   titleElement.style.opacity = "0.7";
});

// Function to restore the h1 opacity when mouse leaves
titleElement.addEventListener("mouseleave", function () {
   titleElement.style.opacity = "1";
});

// Function to refresh the page when the h1 is clicked
titleElement.addEventListener("click", function () {
   location.reload();
});

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
         console.log(result);
         if (!result || result.length === 0) {
            // If result is empty or not valid, display the error message
            console.log('error')
            cocktailName.innerHTML = 'Whoops, Try Again';
            cocktailImage.innerHTML = `
            <img src= ./assets/glass-martini-spilled-liquid-pink-green-background-modern-art-photography-135682922.webp>
            `;
            cocktailIngredients.innerHTML = '';
            cocktailInstructions.innerHTML = '';
            return;  // Exit from the function
         }
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

// //randomizes output from array
function getname(namearray){
   if (namearray.length === 0) {
      console.log('error');
      cocktailName.innerHTML = 'Whoops, Try Again';
      cocktailImage.innerHTML = `
      <img src= ./assets/glass-martini-spilled-liquid-pink-green-background-modern-art-photography-135682922.webp>
      `;
      cocktailIngredients.innerHTML = '';
      cocktailInstructions.innerHTML = '';
      return
   }
   randomnum = Math.floor(Math.random() * namearray.length);
   console.log(randomnum);
   drinknameinfunction = namearray[randomnum].name;  
   // run api2 function with drinknameinfunction variable;
   var newerarray = namearray.filter(item => item !== namearray[randomnum]);
   api2(drinknameinfunction, newerarray)
   
};

function api2(drinknameinfunction, newerarray){
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
         getname(newerarray)
         
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

   // function to display drinks stored in local storage
   function displayHistory(drink) {
      // clearing all containers before rendering from local storage
      cocktailName.innerHTML = '';
      cocktailImage.innerHTML = '';
      cocktailInstructions.innerHTML = '';
      cocktailIngredients.innerHTML = '';
      // drink name
      var name = drink.strDrink;
      var nameEl = document.createElement('h2');
      nameEl.textContent = `${name}`;
      cocktailName.append(nameEl);
      // imag 
      var img = drink.strDrinkThumb;
      var imgEl = document.createElement('img');
      imgEl.src = `${img}`;
      cocktailImage.append(imgEl);

      // instructions 
      var instructions = drink.strInstructions;
      var insEl = document.createElement('p');
      insEl.textContent = `${instructions}`;
      cocktailInstructions.append(insEl);

      // creating array for drink ing. 
      var ingredients = [
         drink.strIngredient1,
         drink.strIngredient2,
         drink.strIngredient3,
         drink.strIngredient4
      ];
      
       // Create ul element to carry ingredients
      var ul = document.createElement("ul");
      
       // adding li item to ul for each ing.
      ingredients.forEach(function (ingredient) {
         var listItem = document.createElement("li");
         listItem.textContent = ingredient;
         ul.appendChild(listItem);
      });
      // adding ul element to container
      cocktailIngredients.append(ul);
   }


// getStorage();
function searchHistoryClick (e) {
   getStorage();
   // condition to check if clicked was a btn
   if (!e.target.matches('.btn-history')) {
      return;
   }
   
   var Btn = e.target;
   // this search variable is an object for the drink
   var search = JSON.parse(Btn.getAttribute('data-search'));
   console.log(search)
   // run display history function to replace search
   displayHistory(search);
}
function clearLocalStorageAndRefresh() {
   localStorage.removeItem('search-history'); 

   location.reload();
}

// Add a click event listener to the "Clear History" button
var clearStorageButton = document.getElementById('clear-storage-btn');
clearStorageButton.addEventListener('click', function() {
      clearLocalStorageAndRefresh();
   }
);
getStorage();
 //calls alll functions on button press
inputbtnel.addEventListener('click', function(event){
   console.clear();
   event.preventDefault();
   cocktailIngredients.innerHTML = '';
   cocktailInstructions.innerHTML = '';
   getnamedata();
   })
   historyEl.addEventListener('click', searchHistoryClick);
