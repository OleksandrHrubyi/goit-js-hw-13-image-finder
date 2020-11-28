import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import remarkup from '../handlTamplate/list.hbs';
import PicturesApiService from './apiService'
import { galary, input } from './refs';
import { observer } from './observer';
import { noPictures, errorWrongName } from './pnotifyTamplate';

export const picturesApiService = new PicturesApiService();




const onSearch = function (event) {
    event.preventDefault();
    picturesApiService.query = event.currentTarget.query.value;
    
    if (picturesApiService.query === '') {
        errorWrongName()
        return
    }
    
    picturesApiService.resetPage();
    picturesApiService.fetchPict().then(pictures => {
        clear();
        observer.observe(document.querySelector('.observer'));
        if (pictures.length === 0)
        {
            noPictures()
            return
        }
        renderPictures(pictures);
    })
    
};



const renderPictures = function (pict) {
    galary.insertAdjacentHTML('beforeend', remarkup(pict))
};


const clear = function () {
    galary.innerHTML = "";
};


const clearInputValue = function () {
    input.value = "";
    clear();
};



export { onSearch, renderPictures, clearInputValue }





