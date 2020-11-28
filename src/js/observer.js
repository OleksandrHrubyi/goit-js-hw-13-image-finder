import { picturesApiService, renderPictures } from './renderPageFunctions';
import { errorNoMorePictures } from './pnotifyTamplate';
import { input } from './refs';



const option = {
    rootMargin: '300px',
}

export const observer = new IntersectionObserver(function (entries) {
    
    entries.forEach(entry => {
       
        if (entry.isIntersecting && input.value !== "")
        {
            picturesApiService.fetchPict().then(pictures => { renderPictures(pictures) }).catch(() => {
                observer.disconnect();
                errorNoMorePictures();
            })
        }
       
    });
}, option);