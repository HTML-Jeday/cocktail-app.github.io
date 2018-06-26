class UI{
    displayCategories(){
        const categoryList = cocktail.getCategories()
        .then(data =>{
           const drinks = data.cocktails.drinks;
           
           drinks.forEach(drink=>{
             
               let option = document.createElement('option');
               option.innerHTML = drink.strCategory;
               option.value = drink.strCategory.split(' ').join('_');
               document.querySelector('.search-category').appendChild(option);
           })
        })
        
    }
    displaySingleRecipe(drink){
        const modalTitle = document.querySelector('.modal-title'),
              modalDescription = document.querySelector('.modal-body .description-text'),
              modalIngridients = document.querySelector('.modal-body .ingredient-list .list-group');

              modalTitle.innerHTML = drink.strDrink;
              modalDescription.innerHTML = drink.strInstructions;
              modalIngridients.innerHTML = this.displayIngredients(drink);
    }
    printMessage(message, className){
        const div = document.createElement('div');
       
        div.innerHTML = `
        <div class="alert alert-dismissible alert-${className}">
            <button type="button" class="close" data-dismiss="alert">X</button>
            ${message}
        </div>
        `
        document.querySelector('#search-form').appendChild(div);

        setTimeout(()=>{
            div.remove();
        }, 3000)
    }
    displayDrinks(cocktails){
        let string = '';
        cocktails.forEach(drink => {
          
            string += ` <div class="col-md-4">
            <div class="card my-3">
            <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
            +
            </button>
                <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">

                 <div class="card-body">
                      <h2 class="card-title text-center">${drink.strDrink}</h2>
                      <a href="#" data-target="#recipe" class="btn btn-success get-recipe" data-toggle="modal" data-id="${drink.idDrink}">Get Recipe</a>
                     
                 </div>
            </div>
       </div>
  `
         
        });
        document.querySelector('#total').innerHTML = cocktails.length;
        document.querySelector('.results-wrapper').style.display = 'block';
        document.querySelector('#results').innerHTML = string;

        this.isFavorite();
    }
    displayCocktailsWithIngrediants(cocktails){
    
    
        let string = '';
        cocktails.forEach(drink => {
          
            string += ` <div class="col-md-6">
            <div class="card my-3">
                 <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
                 +
                 </button>
                 <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">

                 <div class="card-body">
                      <h2 class="card-title text-center">${drink.strDrink}</h2>
                      <p class="card-text font-weight-bold">Instructions: </p>
                      <p class="card-text">
                            ${drink.strInstructions}
                      </p>
                      <p class="card-text">
                           <ul class="list-group">
                                <li class="list-group-item alert alert-danger">Ingredients</li>
                                ${this.displayIngredients(drink)}
                           </ul>
                      </p>
                      <p class="card-text font-weight-bold">Extra Information:</p>
                      <p class="card-text">
                           <span class="badge badge-pill badge-success">
                                ${drink.strAlcoholic}
                           </span>
                           <span class="badge badge-pill badge-warning">
                                Category: ${drink.strCategory}
                           </span>
                      </p>
                 </div>
            </div>
       </div>
  `
         
        });
        document.querySelector('#total').innerHTML = cocktails.length;
        document.querySelector('.results-wrapper').style.display = 'block';
        document.querySelector('#results').innerHTML = string;
        
        this.isFavorite();
    }
    displayFavoriteDrinks(drinks){
     
      
      
        drinks.forEach(drink=>{
           const tr = document.createElement('tr');
           tr.innerHTML = `
           <td>
           <img src="${drink.image}" width=100>
           </td>
           <td>${drink.name}</td>
           <td>
           <a href="#" data-toggle="modal" data-target="#recipe" data-id="${drink.id}" class="btn btn-success get-recipe">View</a>
           </td>
           <td>
           <a href="#"  data-id="${drink.id}" class="btn btn-danger remove-recipe">Remove</a>
           </td>
           `
           document.querySelector('#favorites tbody').appendChild(tr)
        })
 
        
    }
    removeFavorite(domElement){
        domElement.remove();
    }

    displayIngredients(drink){
    
        let ingridients = [];
  
        for(let i = 1 ; i < 16 ; i++){
            let ingridientMeasure = {};
            if(drink[`strIngredient${i}`] !== ''){
                ingridientMeasure.ingridient = drink[`strIngredient${i}`];
                ingridientMeasure.measure = drink[`strMeasure${i}`];
                ingridients.push(ingridientMeasure)
            }
        
            
        }
    
        let template = ''
         ingridients.forEach(ingridient=>{
            template += `
            <li class="list-group-item">${ingridient.ingridient} - ${ingridient.measure}</li>
        
         `
     
        
       })
       return template;
     
    }

    isFavorite(){
        const drinks = cocktailDB.getFromDB();

        drinks.forEach(drink =>{
            let {id} = drink;
           

            let favoriteDrink = document.querySelector(`[data-id="${id}"]`);

            if(favoriteDrink){
                favoriteDrink.classList.add('is-favorite');
                favoriteDrink.textContent = '-';
            }
        })

    }
}