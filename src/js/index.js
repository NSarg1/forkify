import Search from './models/Search';
import * as searchView from './views/searchView'
import {elements, renderLoader, clearLoader} from './views/base'

/** Global state app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Linked recipes
 */
const state = {}

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

        // 4. Search for recipes
        await state.search.getResults();

        // 5. Render results on UI
        clearLoader()
        searchView.renderResults(state.search.results)
    }
}



elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});



elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResult();
        searchView.renderResults(state.search.results, goToPage )
    }
})