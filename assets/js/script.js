//Array to import ingredients
var owned = ['rum', 'lime'];
//convert ingredients array into string seperated by commas
var search = owned.join(',');
//use ingredients to import api data as array
function getnamedata(){
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
//call function (assign to user interface later)
getnamedata();
//randomizes output from array
function getname(){
   randomnum = Math.floor(Math.random()*(10));
   console.log(randomnum);
   drinknameinfunction = namearray[randomnum].name;  
   return drinknameinfunction;
};
//assings drink name to variable, "drinkname" for later use.
drinkname = getname();
console.log(drinkname);

var drinkname = drinkname.replace(" ","_");
 // sets request url to search by drinkname
 var urlRequest = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

fetch(urlRequest + drinkname)
 .then(function (response) {
    return response.json();
 })
 .then(function (data)  {
    console.log(data);
    console.log(data.drinks[0]);
    var myDrink = data.drinks[0];
    console.log(myDrink.strDrink);
    console.log(myDrink.strDrinkThumb);
    console.log(myDrink.strInstructions);
    var count = 1;
    var ingredients = [];
    for(var i in myDrink) {
      var ingredient = "";
      var measure = "";
      if(i.startsWith("strIngredient")&&  myDrink[i]) {
         ingredient = myDrink[i];
         if(myDrink['strMeasure' + count]){
            measure = myDrink['strMeasure' + count];
         } else{
            measure = "";
         }
         count += 1;
         ingredients.push('${measure} ${ingredients}');
         }
      }
      console.log(ingredients);
 });
 
