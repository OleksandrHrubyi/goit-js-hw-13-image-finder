import './styles.css';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css'
import remarkup from './handlTamplate/list.hbs';
//import './js/scroll';
import PicturesApiService from './js/apiService'
import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import * as Confirm from "@pnotify/confirm";
import "@pnotify/confirm/dist/PNotifyConfirm.css";

const lodash = require('lodash');
const basicLightbox = require('basiclightbox')

const picturesApiService = new PicturesApiService()





const ref = {
  searchForm: document.querySelector('#search-form'),
  galary: document.querySelector('.galary-container'),
  btn: document.querySelector('.btn-clear'),
  list: document.querySelector('.galary-container'),
  loadMore: document.querySelector('.more'),
  btnFind: document.querySelector('.btn-find'),
  input: document.querySelector('.input')
  
  }
 
 

ref.searchForm.addEventListener('submit', onSearch)
ref.btn.addEventListener('click', clearInputValue)
ref.list.addEventListener('click', onClickList)
//ref.loadMore.addEventListener('click', onLoadMore)













function onSearch(event)
{
  console.log(event)
  event.preventDefault();
  picturesApiService.query = event.currentTarget.query.value;
  if (picturesApiService.query === '')
  {
    errorTooManySearching()
    return
  }
  picturesApiService.resetPage();
  
  picturesApiService.fetchPict().then(pictures => {
    clear();
    renderPictures(pictures)
  })
}



// function onLoadMore()
// {
//    picturesApiService.fetchPict().then(pictures => {renderPictures(pictures)})
// }




function renderPictures(pict)
{
  ref.galary.insertAdjacentHTML('beforeend', remarkup(pict));
}


// function onInput(event) {
//   event.preventDefault();
//   const searchQuery = event.currentTarget.query.value;
//   picturesApiService.fetchPict(searchQuery)
//       .then(pictures => {
//       ref.galary.insertAdjacentHTML('beforeend', remarkup(pictures.hits));
//     }).catch(clear);
//     return
 

// }

// function fetchByClass(typeName) {
//   try {
//       return fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${typeName}&page=1&per_page=12&key=${API_KEY}`).then(res => res.json())
//   }
//   catch (error) {
//    console.log(error)
//   }
  
// }





function clear() {
  ref.galary.innerHTML = "";
}


function clearInputValue() {
  ref.input.value = "";
  clear();
}








function onClickList(event) {
  
  
  if (event.target.nodeName !== 'IMG')
  {
    return
    }
  
  const instance = basicLightbox.create(`
      <img class = "imgModal" src="${event.target.dataset.source}" width="800" height="600">`)
  instance.show()
  
}
       



const errorTooManySearching = function () {
  error({
    text:
      "Sorry, please enter what you want to find.",
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
}




const option = {
    rootMargin: '100px',
    //threshold: 0.5,

}

const observer = new IntersectionObserver(function (entries) {
  
  entries.forEach(entry =>
  {
        if (entry.isIntersecting && ref.input.value !== "")
        {
          picturesApiService.fetchPict().then(pictures => { renderPictures(pictures) })
    }
  });

}, option);


observer.observe(document.querySelector('.observer'));