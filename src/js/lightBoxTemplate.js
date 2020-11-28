const basicLightbox = require('basiclightbox');

const onClickList = function (event) {
    if (event.target.nodeName !== 'IMG') {
        return
    }
    
    const instance = basicLightbox.create(`<img class = "imgModal" src="${event.target.dataset.source}" width="800" height="600">`);
    instance.show()
};


export {onClickList} 