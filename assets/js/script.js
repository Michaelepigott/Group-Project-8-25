
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
 });