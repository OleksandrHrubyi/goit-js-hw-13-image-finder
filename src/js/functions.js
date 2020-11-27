import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import remarkup from '../handlTamplate/list.hbs';
import PicturesApiService from '../js/apiService'
import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import * as Confirm from "@pnotify/confirm";
import "@pnotify/confirm/dist/PNotifyConfirm.css";
import { galary, input } from './refs';
import { intersection } from 'lodash';
const basicLightbox = require('basiclightbox');
const picturesApiService = new PicturesApiService();
const perPage = 28;



//OBSERVER

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








const onSearch = function (event) {
    event.preventDefault();
    picturesApiService.query = event.currentTarget.query.value;
    console.log(event)
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
        
        

        console.log(pictures)
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






//LIGHTBOX

const onClickList = function (event) {
    if (event.target.nodeName !== 'IMG') {
        return
    }
    
    const instance = basicLightbox.create(`<img class = "imgModal" src="${event.target.dataset.source}" width="800" height="600">`);
    instance.show()
};


//PNOTIFY

const errorWrongName = function () {
    error({
        text: "Please enter what you want to find.",
        
        modules: new Map([
            [
                Confirm,
                {
                    confirm: true,
                    buttons:
                        [
                            {
                                text: "Ok",
                                primary: true,
                                click: notice => {
                                    notice.close();
                                }
                            }
                        ]
                }
            ]
        ])
    });
};



//PNOTIFY

 const errorNoMorePictures = function () {
    error({
        text:
            "Sorry, it was the last page.",
        modules: new Map([
            [
                Confirm,
                {
                    confirm: true,
                    buttons: [
                        {
                            text: "Ok",
                            primary: true,
                            click: notice => {
                                notice.close();
                            }
                        }
                    ]
                }
            ]
        ])
    });
};


//PNOTIFY

const noPictures = function () {
    error({
        text:
            "Sorry, we cant find any pictures.",
        modules: new Map([
            [
                Confirm,
                {
                    confirm: true,
                    buttons: [
                        {
                            text: "Ok",
                            primary: true,
                            click: notice => {
                                notice.close();
                            }
                        }
                    ]
                }
            ]
        ])
    });
};


export { onSearch, onClickList, renderPictures, clearInputValue, errorNoMorePictures }





