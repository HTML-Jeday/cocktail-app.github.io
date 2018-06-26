//classes
const ui = new UI();
const cocktail = new CocktailAPI();
const cocktailDB = new CocktailDB;

//eventlisteners
eventListeners();


function eventListeners(){

    document.addEventListener('DOMContentLoaded', documentReady)

    const form = document.querySelector('#search-form');
    if(form){
        form.addEventListener('submit', getCoctails);
    }

    const results = document.querySelector('#results');

    if(results){
        results.addEventListener('click', resultsDelegation);
    }
    
}


function getCoctails(e){
    e.preventDefault();
    const searchTerm = document.querySelector('#search').value;

    if(searchTerm === ''){
        ui.printMessage('That was an error', 'danger');
    }else{
        let response;

        const type = document.querySelector('#type').value;

        switch(type){
            case 'name':
            response =  cocktail.qetDrinksByName(searchTerm);
            break;
            case 'ingredient':
            response =  cocktail.getDrinksByIngridient(searchTerm);
            break;
            case 'category':
            response =  cocktail.getDrinksByCategory(searchTerm);
            break;
            case 'alcohol':
            response =  cocktail.getDrinksByAlcohol(searchTerm);
            break;
        }


      
        response.then(data =>{
            const drinks = data.cocktails.drinks;
            if(drinks === null){
                ui.printMessage('There no results, try a different term', 'danger');
            }else{
                if(type === 'name'){
                    ui.displayCocktailsWithIngrediants(drinks);
                }else{
                    ui.displayDrinks(drinks);
                }
               
             
            }

           
         
        })
    }
}

function resultsDelegation(e){
    e.preventDefault();

    if(e.target.classList.contains('get-recipe')){
        cocktail.getSingleRecipe(e.target.dataset.id)
        .then(data =>{
            const drink = data.cocktails.drinks[0];
            ui.displaySingleRecipe(drink);
        })
    }
    if(e.target.classList.contains('favorite-btn')){
        if(e.target.classList.contains('is-favorite')){
            e.target.classList.remove('is-favorite')
            e.target.textContent = '+'
            
            cocktailDB.removeFromDB(e.target.dataset.id)
        }else{
            e.target.classList.add('is-favorite')
            e.target.textContent = '-'
            
            const parentBody = e.target.parentElement;
            const drinkInfo = {
                id : e.target.dataset.id,
                name : parentBody.querySelector('.card-title').textContent,
                image: parentBody.querySelector('.card-img-top').src
            }
            console.log(drinkInfo)
            cocktailDB.saveIntoDB(drinkInfo);

        }
    }
}

function documentReady(){

    ui.isFavorite();
    const select = document.querySelector('.search-category');
    const favorites = document.querySelector('#favorites');
    if(select){
        ui.displayCategories();
    
    }
    if(favorites){

        const drinks = cocktailDB.getFromDB();
        ui.displayFavoriteDrinks(drinks);


        favorites.addEventListener('click', (e) => {
            e.preventDefault();

            if(e.target.classList.contains('get-recipe')){
                console.log(drinks)
                cocktail.getSingleRecipe( e.target.dataset.id )
                .then(recipe => {
                    console.log(recipe)
                    ui.displaySingleRecipe ( recipe.cocktails.drinks[0])
                })
            }

            if(e.target.classList.contains('remove-recipe')){
              
                ui.removeFavorite(e.target.parentElement.parentElement)

                cocktailDB.removeFromDB(e.target.dataset.id);
            }
           
        })

    }

    
}

// variables