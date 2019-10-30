import Search from './models/Search';

/** Global state app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Linked recipes
 */
const state = {}

const controlSearch = async () => {
    // Get query from view
    const query = 'pizza' //ToDo

    if (query) {
        // 2. New Search object
        state.search = new Search(query)
        // 3. Prepare UI for results

        // 4. Search for recipes
        await state.search.getResults();

        // 5. Render results on UI
        console.log(state.search.results);
    }
}


document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();


});