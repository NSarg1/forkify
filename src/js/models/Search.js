import axios from "axios";
export default class Search{
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const key = 'd56d9cc36979e1a8a889e08df600fcb4'
        try{
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`)
            this.results = res.data.recipes;
        } catch(err){
            alert(err)
        }        
    }

}