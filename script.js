const input = document.querySelector('.input');
const box = document.querySelector('.container');
const form = document.querySelector('form');
const display = document.querySelector('.display');
const recipecontainer = document.querySelector('.reciepe-container');
const recipeCloseButton = document.querySelector('.reciepe-button');
const recipefulldetails = document.querySelector('.reciepe-detail-container');
 
const receipeIngredients = (food)=>{
   let ingredientList = '';
   for(let i=1;i<=20;i++){
        const ingredient = food[`strIngredient${i}`];
        if(ingredient){
            const measure = food[`strMeasure${i}`];
            ingredientList+=`<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientList;
}

const receipedetails = (food)=>{
    const receipeName = food.strMeal;
    recipefulldetails.innerHTML = `<h1>${receipeName}</h1>
    <h3>Ingredients</h3>
    <ul class="ingredientList">${receipeIngredients(food)}</ul>
    <h3>Instructions</h3>
    <p>${food.strInstructions}</p>`;
    recipecontainer.style.display = 'block';
};


// Event listner when we submit the form
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let searchRecipe = input.value;
    fetchreceipe(searchRecipe);
})

// Function to fetch the recipe data from the api
const fetchreceipe = async (query)=>{
    box.innerHTML = '<h1>Fetching Receipes.....</h1>'
    try {
    if(query==''){
        box.innerHTML = `<h1>Type the meal in the search box.</h1>`
        return;
    }

    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await api.json();
    console.log(response);
    box.innerHTML = '';
    if(response.meals.length>0){
        display.style.display = "none";
        // console.log("Why");
        response.meals.forEach(food => {
            const title = food.strMeal;
            const image = food.strMealThumb;
            const place = food.strArea;
            const category = food.strCategory;
            const receipeCard = document.createElement('div');
            receipeCard.classList.add('card')
            receipeCard.innerHTML = `
             <img src="${image}" alt="">
            <h2>${title}</h2>
            <h4>${place} Dish</h4>
            <h4>Belongs to ${category} Category.</h4> 
           `; 

           const button = document.createElement('button');
           button.innerText = 'View Recipe';
           receipeCard.appendChild(button);
           button.addEventListener('click',()=>{
            receipedetails(food);
        });
           box.appendChild(receipeCard);
        });
    }

    // Recipe close Button to close the pop up disply of containg the receipe 
        recipeCloseButton.addEventListener('click',()=>{
            recipecontainer.style.display = 'none';

        })  

    } catch (error) {
        box.innerHTML = '<h1>Error in Fetching Recipes....</h1>'
    }
};


