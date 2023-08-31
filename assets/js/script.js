var url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';

fetch(url)
 .then(function (response) {
    return response.json();
 })
 .then(function (data)  {
    console.log(data);
 });