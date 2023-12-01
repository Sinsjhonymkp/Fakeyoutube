const API_KEY = "AIzaSyAYyQ2blvvUktM_joWXvcZ8ej34emXBwVE";
const VIDEOS_URL = "https://www.googleapis.com/youtube/v3/videos";
const SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";


const favoriteIds = JSON.parse(localStorage.getItem('favoriteYT')|| "[]" );
console.log(favoriteIds)

const videoListItems = document.querySelector(".video-list__items");

const convertISOToReadleDuration =(isoDuration) => {

  const hoursMatch = isoDuration.match(/(\d+)H/)
  const minutesMatch = isoDuration.match(/(\d+)M/)
  const secondsMatch = isoDuration.match(/(\d+)S/)

const   hours =  hoursMatch ? parseInt(hoursMatch[1]): 0;
const minutes = minutesMatch ? parseInt(minutesMatch[1]): 0;
const seconds = secondsMatch ? parseInt(secondsMatch[1]): 0;

let result = '';
if (  hours > 0){
  result += `${hours} ч `
}
if (minutes > 0){
  result += `${minutes}  мин `
}
if (seconds > 0){
  result += `${seconds}  сек`
}
return result.trim();
};

const formateDate = (isoString) => {
  const date = new Date(isoString);
  const formater = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return formater.format(date);
};

const fetchTrendingVideos = async () =>{
    try {
        const url = new URL(VIDEOS_URL);
        url.searchParams.append('part', 'contentDetails,id,snippet');
        url.searchParams.append('chart', 'mostPopular');
        url.searchParams.append('regionCode', 'US');
        url.searchParams.append('maxResults', '50');
        url.searchParams.append('key', API_KEY);
        const response = await fetch(url);

        if(!response.ok){
            throw new Error(`HTTP error ${response.status}`);
        }

        return await response.json()
    } catch (error) {
        
        console.error('error: ', error);
    }

};
const fetchFavoriteVideos = async () =>{
  try {
    if (favoriteIds.lenght === 0){
       return { items: [] };
  }

      const url = new URL(VIDEOS_URL);

      url.searchParams.append('part', 'contentDetails,id,snippet'); 
      url.searchParams.append('id', favoriteIds.join(","));
      url.searchParams.append('key', API_KEY);
      const response = await fetch(url);

      if(!response.ok){
          throw new Error(`HTTP error ${response.status}`);
      }

      return await response.json()
  } catch (error) {
      
      console.error('error: ', error);
  }

};

const fetchVideoData = async (id) =>{
  try {

      const url = new URL(VIDEOS_URL);

      url.searchParams.append('part', 'snippet, statistics'); 
      url.searchParams.append('id', id);
      url.searchParams.append('key', API_KEY);

      const response = await fetch(url);

      if(!response.ok){
          throw new Error(`HTTP error ${response.status}`);
      }

      return await response.json()
  } catch (error) {
      
      console.error('error: ', error);
  }

};

const displayVideo = (videos) => {

    videoListItems.textContent = "";
   
   const listVideos = videos.items.map((video) => {
    const li = document.createElement('li');
    li.classList.add('video-list__item');
    console.log(video)
    
    li.innerHTML = `<article class="video-card">
    <a href="video.html?id=${video.id}" class="video-card__link">
      <img src="${video.snippet.thumbnails.standart?.url || 
        video.snippet.thumbnails.high?.url
     }" alt="Превью видео ${video.snippet.title}" class="video-card__thubnail">
      <h3 class="video-card__title">${video.snippet.title}</h3>
      <p class="video-card__chanel">${video.snippet.channelTitle} </p>
      <p class="video-card__duration">${convertISOToReadleDuration(video.contentDetails.duration)}</p>
    </a>
    <button class="video-card__favorite favorite ${favoriteIds.includes(video.id) ? "active" : ""}" type="button" aria-label="Добавить в избранное, ${video.snippet.title}"
    data-video-id=${video.id}>
      <svg class="video-card__icon">
        <use class="star" xlink:href="img/sprite.svg#star"></use>
        <use class="star-o" xlink:href="img/sprite.svg#star-ow"></use>
      </svg>
    </button>
  </article>
  `;
  return li;
   });

  videoListItems.append(...listVideos);  
};
const displayOneVideo = ({items: [video]}) => {
  const videoElem = document.querySelector('.video');

  videoElem.innerHTML = `
  <div class="container">
  <div class="video__player">
    <iframe class="video__iframe" width="925" height="520" src="https://www.youtube.com/embed/${video.id}"
      title="Объяснение Вёрстки Простого Сайта HTML+CSS" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen></iframe>
  </div>
  <div class="video__container">
    <div class="video__content">
      <h2 class="video__title">${video.snippet.title}</h2>
      <p class="video__channel">${video.snippet.channelTitle}</p>
      <p class="video__info"><span class="video__views">${parseInt(video.statistics.viewCount, ).toLocaleString()} просмотров</span>
        <span clasx="video__date">${formateDate(video.snippet.publishedAt,)}</span>
      </p>
      <p class="video__description">${video.snippet.description}</p>
    </div>
    <button href="favorite.html" class="video__link favorite ${
      favoriteIds.includes(video.id) ? "active" : ""} aria-label="Добавить в избранное, ${video.snippet.title}"
      data-video-id=${video.id}>
      <span class="video__favorite">В Избранном</span>
      <span class="video__no-favorite"> Добавить в Избранное</span>

      <svg class="video__icon">
      <use class="star" xlink:href="img/sprite.svg#star"></use>
      </svg>
    </button>

  </div>
</div>`;

};



const searchVideo = (searching) => {

  search.textContent = `${search}`;
 
 const listVideos = videos.items.map((video) => {
  const li = document.createElement('li');
  li.classList.add('video-list__item');
  console.log(video)
  
  li.innerHTML = `<article class="video-card">
  <a href="video.html?id=${video.id}" class="video-card__link">
    <img src="${video.snippet.thumbnails.standart?.url || 
      video.snippet.thumbnails.high?.url
   }" alt="Превью видео ${video.snippet.title}" class="video-card__thubnail">
    <h3 class="video-card__title">${video.snippet.title}</h3>
    <p class="video-card__chanel">${video.snippet.channelTitle} </p>
    <p class="video-card__duration">${convertISOToReadleDuration(video.contentDetails.duration)}</p>
  </a>
  <button class="video-card__favorite favorite ${favoriteIds.includes(video.id) ? "active" : ""}" type="button" aria-label="Добавить в избранное, ${video.snippet.title}"
  data-video-id=${video.id}>
    <svg class="video-card__icon">
      <use class="star" xlink:href="img/sprite.svg#star"></use>
      <use class="star-o" xlink:href="img/sprite.svg#star-ow"></use>
    </svg>
  </button>
</article>
`;
return li;
 });

videoListItems.append(...listVideos);  
};

const init = () => {
  const currentPage = location.pathname.split('/').pop();
  console.log(currentPage);

  const urlSearchParams = new URLSearchParams(location.search);
  const videoId = urlSearchParams.get('id');

  if (currentPage == "index.html" || currentPage === ''){
    fetchTrendingVideos().then(displayVideo);
  }
   else if (currentPage === 'video.html' && videoId) {
    fetchVideoData(videoId).then(displayOneVideo);
    fetchTrendingVideos().then(displayVideo);
  }
   else if (currentPage === 'favorite.html') {
    fetchFavoriteVideos().then(displayVideo);
  }
   else if (currentPage === 'search.html') {
    fetchTrendingVideos().then(displayVideo);
  
  }


document.body.addEventListener('click', ({target}) => {
  const itemFavorite = target.closest('.favorite');

  if (itemFavorite) {
   const videoId = itemFavorite.dataset.videoId;
   if (favoriteIds.includes(videoId)) {
    favoriteIds.splice(favoriteIds.indexOf(videoId), 1);
    localStorage.setItem('favoriteYT', JSON.stringify(favoriteIds));
    itemFavorite.classList.remove('active');
    
   } else{
    favoriteIds.push(videoId);
    localStorage.setItem('favoriteYT', JSON.stringify(favoriteIds));
    itemFavorite.classList.add('active');
   }
  }
});
};
init();



