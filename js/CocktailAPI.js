class CocktailAPI{
    async qetDrinksByName(name){
        const searchRequest = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);

        const cocktails = await searchRequest.json();

        return {
            cocktails
        }
    }
    async getDrinksByIngridient(ingridient){
        const searchRequest = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingridient}`);

        const cocktails = await searchRequest.json();

        return {
            cocktails
        }
    }
    async getSingleRecipe(id){
        const searchRequest = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);

        const cocktails = await searchRequest.json();

        return {
            cocktails
        }
    }
    async getCategories(){
        const searchRequest = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`);

        const cocktails = await searchRequest.json();

        return {
            cocktails
        }
    }
    async getDrinksByCategory(category){
        const searchRequest = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);

        const cocktails = await searchRequest.json();

        return {
            cocktails
        }
    }
    async getDrinksByAlcohol(term){
        const searchRequest = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${term}`);

        const cocktails = await searchRequest.json();

        return {
            cocktails
        }
    }

}