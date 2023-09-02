let primaryArray = [];
let preNumbers;
const emptyData = document.getElementById('empty-data');

const loadBtn = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
  const data = await res.json();
  const categories = data.data;
  const btnContainer = document.getElementById('Btn-container');
  categories.forEach(category => {
    const categoryBtn = document.createElement('div');
    categoryBtn.classList = `inline`;
    categoryBtn.innerHTML = `<button class="w-[200px] m-5 rounded-lg font-bold p-3 bg-slate-200 text-black mx-5 text-center hover:bg-red-600 hover:text-white :border-blue-400  active:bg-green-700 active:text-white focus:bg-red-900 focus:text-white" onclick="handleBtn('${category.category_id}')">${category.category}</button>`;
    btnContainer.appendChild(categoryBtn);
  })
}

const handleBtn = async (categoryId) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
  const data = await res.json();
  const videoContainer = document.getElementById('videos-container');
  if (data.data.length === 0) {
    emptyData.classList.remove('hidden');
  }
  else {
    emptyData.classList.add('hidden');
  }
  videoContainer.innerHTML = "";
  data.data.forEach(video => {
    const videoCard = document.createElement('div');
    const hours = Math.floor(video.others.posted_date / 3600);
    const minutes = Math.floor((video.others.posted_date % 3600) / 60);
    const seconds = Math.floor((video.others.posted_date % 60) );
    const time1 = hours + "Hr " + minutes + "Min " + seconds+"Sec "+ "ago";
    videoCard.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
            <figure class="relative"><img src="${video.thumbnail}" alt="" class="rounded-lg h-[250px] w-full" /> 
           ${video.others.posted_date > 0 ? '<p class="absolute bg-black text-white font-bold rounded-lg p-2 right-2 bottom-2">' + time1 + '<p/>' : ''} 
            </figure>
            <div class="p-4 flex gap-4 justify-start ">
              <div class="">
                <img src="${video.authors[0].profile_picture}" alt="" class="bg-white b-3 w-[50px] h-[50px] rounded-full">
              </div>
              <div class="">
                <h2 class="card-title">
                  ${video.title}    
                </h2>
                <p>${video.authors[0]?.profile_name}  ${video.authors[0].verified ? '<img class="inline" src="Images/Group 3.png">' : ''} </p>
                <p>${video.others.views} views</p>
              </div>
            </div>
          </div>
        `;
    videoContainer.appendChild(videoCard);
  })
}

const sortBtn = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/1000`);
  const data = await res.json();
  const c = data.data;
  const videoContainer = document.getElementById('videos-container');
  if (data.data.length === 0) {
    emptyData.classList.remove('hidden');
  }
  else {
    emptyData.classList.add('hidden');
  }
  videoContainer.innerHTML = "";
  c.forEach(number =>{
  const b= number.others.views;
    const preNumbers = parseFloat(number.others.views);
    primaryArray.push(preNumbers);
    primaryArray.sort(function (a, b) {
      return b - a;
    });
    console.log(primaryArray);
    const videoCard = document.createElement('div');
    const hours = Math.floor(number.others.posted_date / 3600);
    const minutes = Math.floor((number.others.posted_date % 3600) / 60);
    const time1 = hours + "Hr " + minutes + "Min " + "ago";
    videoCard.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
            <figure class="relative"><img src="${number.thumbnail}" alt="" class="rounded-lg h-[250px] w-full" /> 
           ${number.others.posted_date > 0 ? '<p class="absolute bg-black text-white font-bold rounded-lg p-2 right-2 bottom-2">' + time1 + '<p/>' : ''} 
            </figure>
            <div class="p-4 flex gap-4 justify-start ">
              <div class="">
                <img src="${number.authors[0].profile_picture}" alt="" class="bg-white b-3 w-[50px] h-[50px] rounded-full">
              </div>
              <div class="">
                <h2 class="card-title">
                  ${number.title}    
                </h2>
                <p>${number.authors[0]?.profile_name}  ${number.authors[0].verified ? '<img class="inline" src="Images/Group 3.png">' : ''} </p>
                <p>${number.others.views} views</p>
              </div>
            </div>
          </div>
        `;
    videoContainer.appendChild(videoCard);
  })
}
loadBtn();
handleBtn(1000);