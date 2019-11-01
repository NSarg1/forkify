import axios from "axios";
import {
    key
} from '../config'

export default class Recipe {
    constructor(id) {
        this.id = id

    }
    async getRecipe() {
        try {
            const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingrediends = res.data.recipe.ingrediends;
            console.log(res);
        } catch (err) {
            console.log(`Somthing went wrong :(`);
        }
    }

    calcTime() {
        // Assuming that we need  15 min for each ingrediends
        const numIng = this.ingrediends.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15
    }

    calcServings() {
        this.servings = 4;
    }

}