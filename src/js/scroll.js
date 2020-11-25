const option = {
    //rootMargin: '100px',
    //threshold: 0.5,

}

const observer = new IntersectionObserver(function (entries) {
  
    entries.forEach(entry => {
        if (entry.isIntersecting)
        {
            
      console.log('пора грузить статьи')
          }
      
  });
}, option);


observer.observe(document.querySelector('.observer'));