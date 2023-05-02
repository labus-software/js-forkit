import { API_URL, RESULTS_PER_PAGE } from "./config";
import { getJSON } from "./helpers";

export const state = {
    recipe: {},
    search:{
      query: '',
      results: [],
      page: 1,
      resultsPerPage: RESULTS_PER_PAGE
    }
}

export const loadRecipe = async function(id){
   try{
    const data = await getJSON(`${API_URL}${id}`);
  
      const { recipe } = data.data;
      state.recipe = {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
      };
  
      console.log(state.recipe);
   }catch(err){
    console.log(err);
    throw err;
   }
}



export const loadSearchResults = async function(query){
  try{
    state.search.query = query;

    const data =  await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(recipe => {
      return{
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url
      }
    })

  }catch(err){
    throw err;
  }
}

// implementing pagination
export const getSearchResultsPage = (page = state.search.page) => {

  state.search.page = page;

  const start = (page-1) * state.search.resultsPerPage; // starting page, will start at 1 [zero in our case, programmers count from zero]
  const end = page * state.search.resultsPerPage; // end page

  // reach to state variable
  // and pull search-results from there giving the starting and end-point of an array
  return state.search.results.slice(start, end);
}