<<<<<<< HEAD
var url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';

fetch(url)
 .then(function (response) {
    return response.json();
 })
 .then(function (data)  {
    console.log(data);
=======

var owned = ['lime', 'coconut'];

var search = owned.join(',');
console.log(search)


$.ajax({
    url: 'https://api.api-ninjas.com/v1/cocktail?ingredients=' + search,
    headers: {'X-APi-Key':'YPxVXKTw1N29WEkYJ7PSqw==3auVDgBW2b9DwHeP'},
    contentType: 'application/json',
  success: function(result) {
       console.log(result);
    },
   error: function ajaxError(jqXHR) {
console.error('Error: ', jqXHR.responseText);
   }
>>>>>>> c89ad33265c7ff11bbd49304b791db350b6437fa
 });

 var url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';

fetch(url)
 .then(function (response) {
    return response.json();
 })
 .then(function (data)  {
    console.log(data);
 });