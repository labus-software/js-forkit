import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import { TIMEOUT_SEC } from './config.js';

const showRecipes = async function()  {
  try {
    const id = window.location.hash.slice(1);    
    if(!id) return;
    
    recipeView.spinner(); // loading spinner

    // update results view to mark selected search results

    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

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

const controlServings = (newServings) => {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = () => {


  // Add/Remove bookmarks
  if(!model.state.recipe.bookmarked){
    model.addBookmark(model.state.recipe);
  }else{
    model.deleteBookmark(model.state.recipe.id);
  }

  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = () => {
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function(newRecipe){
try{
    // render loading spinner
    addRecipeView.spinner();

    // upload new recipe data
    await model.uploadRecipe(newRecipe);

    // render recipe
    recipeView.render(model.state.recipe);

    // Success msg
    addRecipeView.renderSuccessMsg();

    // render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // change id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // close form window
    setTimeout(function(){
      addRecipeView.toggleWindow();
    }, TIMEOUT_SEC * 250)
  }catch(err){
    console.log(err)
    addRecipeView.renderErrorMsg(err.message)
  }


}

const init = () =>{
  recipeView.addHandlerRender(showRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  recipeView.addHandlerBookmarks(controlAddBookmark);
  recipeView.addHandlerUpdateServings(controlServings);
  paginationView.addHandlerClick(controlPagination);
  bookmarksView.addHandlerRender(controlBookmarks);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}

init();