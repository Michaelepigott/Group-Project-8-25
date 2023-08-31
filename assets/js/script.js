//Array to import ingredients
var owned = ['vodka', 'orange juice'];
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
 // sets request url to search by drinkname
 var urlRequest = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + drinkname;

fetch(urlRequest)
 .then(function (response) {
    return response.json();
 })
 .then(function (data)  {
    console.log(data);
 });