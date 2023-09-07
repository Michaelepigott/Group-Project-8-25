//puts elements into dom
input1el = document.getElementById("input-1");
input2el = document.getElementById("input-2");
input3el = document.getElementById("input-3");
input4el = document.getElementById("input-4");
inputbtnel = document.getElementById("input-btn");
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
         return namearray;
      },
      error: function ajaxError(jqXHR) {
   console.error('Error: ', jqXHR.responseText); 
      }
      
    });
}

//randomizes output from array
// function getname(){
//    randomnum = Math.floor(Math.random()*(10));
//    console.log(randomnum);
//    drinknameinfunction = namearray[randomnum].name;  
//    return drinknameinfunction;
// };




// function api2(){
   //assings drink name to variable, "drinkname" for later use.
   // sets request url to search by drinkname in cocktail database
 var urlRequest = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
   // variables to tie into the html
 var cocktailName = document.getElementById("drink-name");
 var cocktailImage = document.getElementById("image");
 var cocktailInstructions = document.getElementById("drink-instructions");
 var cocktailIngredients = document.getElementById("drink-mi");
 //  drinkname = getname();
 //  var drinkname = drinkname.replace(" ","_");
 //  console.log(drinkname);
   // fetches drinkname from api1 and combines with api2
   fetch(urlRequest) //+ drinkname)
function getname(){
   //randomnum = Math.floor(Math.random()*(10));
   //console.log(randomnum);
   //drinknameinfunction = namearray[randomnum].name;  
   //return drinknameinfunction;
};




// function api2(){
   //assings drink name to variable, "drinknamex" for later use.
    // sets request url to search by drinkname
 var urlRequest = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
   drinkname = getname();
   //var drinkname = drinkname.replace(" ","_");
   console.log(drinkname);
   fetch(urlRequest) // + drinkname)
   .then(function (response) {
      return response.json();
   })
   .then(function (data)  {
      if(!data.drinks) {
      return
      }
   // return data.drinks
      console.log(data);
      console.log(data.drinks[0]);
      var myDrink = data.drinks[0];
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
      for (var i=1; i<count; i++) {
         var measure = myDrink['strMeasure' + i];
         var ingredient = myDrink['strIngredient' + i];
         if(measure || ingredient) {
            ingredients.push(`${measure || ""} ${ingredient || ""}`.trim());
         }
      }
         cocktailIngredients.innerHTML = ingredients;
         console.log(ingredients);
   });
 //  };
 //calls alll functions on button press
//  inputbtnel.addEventListener('click', function(event){
//    event.preventDefault();
//    //call function (assign to user interface later)
//    getnamedata();
   
//    api2();
//    });
