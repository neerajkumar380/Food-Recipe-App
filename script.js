const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipeContainer');

const fetchRecipes = async (searchInput) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes....</h2>";
    try{
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
        const response = await data.json();

        recipeContainer.innerHTML = "";
        response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            <p><strong>Area:</strong> ${meal.strArea}</p>
            <p><strong>Instructions:</strong> ${meal.strInstructions.substring(0, 100)}...</p>
        `;
        const button = document.createElement('button');
        button.innerHTML = `<a href="${meal.strSource}" target="_blank">View its full recipe</a>`;
        recipeDiv.appendChild(button);

        recipeContainer.appendChild(recipeDiv);
        });
    }catch(error){
        recipeContainer.innerHTML = "<h2>No recipes found. Please try again!</h2>";
    }
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML = `<h2>Type the meal in search box....</h2>`;
        return;
    }
    fetchRecipes(searchInput);
    // console.log(searchBox.value);
})