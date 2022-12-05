
const API_KEY='api_key=e95bd94d330c39fb0863e01107c2b619';
const BASE_URL='https://api.themoviedb.org/3/'
const API_URL=BASE_URL+'discover/movie?sort_by=popularity.desc&'+API_KEY;
const highrated_api=BASE_URL+'discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&'+API_KEY
const KidsMovie_URL=BASE_URL+'discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&'+API_KEY
const dramas_url=BASE_URL+'discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&'+API_KEY

const main=document.getElementById('main')
const highrated=document.getElementById('highrated')
const kidsMovies=document.getElementById('kidsMovies')
const dramas=document.getElementById('dramas')
const popular=document.getElementById('popular')

const input=document.querySelector('input')
const btn=document.getElementById('btn')

const IMG_URL='https://image.tmdb.org/t/p/w500'

const searchURL=BASE_URL+'search/movie?'+API_KEY
fetchMovies(API_URL)


function fetchMovies(url){
    fetch(url).then(res=>res.json()).then(data=>{
        console.log(data.results);
        showMovies(data.results)
    })
}


function showMovies(data){
    main.innerHTML='';
    data.forEach(movie => {
        const{title,poster_path,vote_average,overview}=movie
        const movie1=document.createElement('div')
        movie1.classList.add('movie')
        movie1.className='shadow rounded'
        movie1.innerHTML=`
        <div class="col">
        <div class="card position-relative">
          <img src="${IMG_URL+poster_path}" class="card-img-top " alt="${title}">
          <div class="card-body">
          
            <h5 class="">${title}</h5>
            <div class="rating position-absolute end-0 bottom-0 rounded p-1 m-1 ${getcolor(vote_average)}">${vote_average}</div>
          </div>
        </div>
      </div>
    
        `
        main.appendChild(movie1)
    });
}
function getcolor(vote){
    if(vote>=8){
        return 'green'
    }else if(vote>=5){
        return 'orange'
    }else{
        return 'red'
    }
}


btn.addEventListener('click',(e)=>{
    e.preventDefault()
    searchTerm=input.value
    if(searchTerm){
        fetchMovies(searchURL+'&query='+searchTerm)
    }
})


highrated.addEventListener('click',(e)=>{
    e.preventDefault()
    fetchMovies(highrated_api)
})

kidsMovies.addEventListener('click',(e)=>{
    e.preventDefault()
    fetchMovies(KidsMovie_URL)
})

dramas.addEventListener('click',(e)=>{
    e.preventDefault()
    fetchMovies(dramas_url)
})


popular.addEventListener('click',(e)=>{
    e.preventDefault()
    fetchMovies(API_URL)
})

//showMovies(searchURL+'&query='+searchTerm)














