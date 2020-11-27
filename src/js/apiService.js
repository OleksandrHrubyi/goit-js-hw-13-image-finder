const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = "19172745-dc53377293ec5b56fbdc242bd";

export default class PicturesApiService {

    constructor() {
        this.searchQuery = '';
        this.page = 1;
     }
    fetchPict() {
        try {
             return fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=28&key=${API_KEY}` )
            .then(pictures => pictures.json()).then(({ hits }) => {
                this.page += 1;
                return hits
            })
        }
        catch (er){
            console.log(er)
        }
       
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery
    }

    set query(newQuery)
    {
        this.searchQuery = newQuery
    }

}