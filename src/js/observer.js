import { picturesApiService, renderPictures } from './renderPage_functions';
import { errorNoMorePictures} from './pnotify_tamplate'
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