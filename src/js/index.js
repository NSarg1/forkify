import Search from './models/Search';
import Recipe from './models/Recipe'
import * as searchView from './views/searchView';
import {
    elements,
    renderLoader,
    clearLoader
} from './views/base'

/** Global state app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Linked recipes
 */
const state = {}


/**
 * Search controller
 */
const controlSearch = async () => {
    // Get query from view
    const query = searchView.getInput() //ToDo

    if (query) {
        // 2. New Search object
        state.search = new Search(query)

        // 3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResult();
        renderLoader(elements.searchRes)

        try {
            // 4. Search for recipes
            await state.search.getResults();
            // 5. Render results on UI
            clearLoader()
            searchView.renderResults(state.search.results)
        } catch (error) {
            alert(error)
            clearLoader()
        }
    }
}



elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});




elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResult();
        searchView.renderResults(state.search.results, goToPage)
    }
})




/**
 * Recipe controller
 */

const controlRecipe = async () => {
    //get id from URL
    const id = window.location.hash.replace('#', '');
    if (id) {
        // Prepare UI for changes

        // Create new recipe object
        state.recipe = new Recipe(id)


        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe()
            state.recipe.parseIngredients()

            // Calculate servings and time
            state.recipe.calcTime()
            state.recipe.calcServings()
            // Render recipe
            console.log(state.recipe);
        } catch (err) {
            alert(err)
        }
    }
}

['hashchange', 'load'].forEach(el => window.addEventListener(el, controlRecipe));