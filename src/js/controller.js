import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';

const showRecipes = async function()  {
  try {
    const id = window.location.hash.slice(1);    
    if(!id) return;
    
    recipeView.spinner(); // loading spinner

    // 1. Loading Recipes
    await model.loadRecipe(id);

    // 2. Rendering recipes
    recipeView.render(model.state.recipe);

  } catch (err) {
    // alert(err.message);
    recipeView.renderErrorMsg();
  }
};

const controlSearchResults = async function(){
  try{

    // Display spinner
    resultsView.spinner();

    // 1) Get Search Query
    const query = searchView.getQuery();
    if(!query) return;

    // 2) Load Search Results
    await model.loadSearchResults(query);

    // 3) Render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination btns
    paginationView.render(model.state.search)
  }catch(err){console.log(err)}
}


const controlPagination = (goToPage) => {
   // 1. Render new results from pagination
    resultsView.render(model.getSearchResultsPage(goToPage));

    // 2. Render new pagination btns
    paginationView.render(model.state.search)
}

const init = () =>{
  recipeView.addHandlerRender(showRecipes);
  searchView.addHandlerSearch(controlSearchResults);

  paginationView.addHandlerClick(controlPagination)
}

init();