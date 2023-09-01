const loadBtn = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
  const data = await res.json();
  const categories = data.data;
  const btnContainer = document.getElementById('Btn-container');
  categories.forEach(category => {
    const categoryBtn = document.createElement('div');
    categoryBtn.classList = `inline`;
    categoryBtn.innerHTML = `<button class="btn p-3 bg-slate-300 text-black mx-5 text-center hover:bg-red-600 hover:text-white visited:bg-yellow-900 visited:text-white active:bg-green-700 active:text-white" onclick="handleBtn('${category.category_id}')">${category.category}</button>`;
    btnContainer.appendChild(categoryBtn);
  })
}


let primaryArray =[];
const emptyData = document.getElementById('empty-data');

const handleBtn = async (categoryId) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
  const data = await res.json();
  const videoContainer = document.getElementById('videos-container');

  if (data.data.length === 0) {
    
    emptyData.classList.remove('hidden');
  }
  else{
    emptyData.classList.add('hidden');
  }
  
  videoContainer.innerHTML = "";
  data.data.forEach(video => {
    // console.log(video);
    const videoCard = document.createElement('div');
    // console.log(data.data.length);
    const hours = Math.floor(video.others.posted_date / 3600);
    const minutes = Math.floor((video.others.posted_date % 3600) / 60);
    // const seconds = video.others.posted_date % 60;
    const time1 = hours + "Hr " + minutes + "Min "+"ago";
    
    console.log(data.data.length);

    videoCard.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
            <figure class="relative"><img src="${video.thumbnail}" alt="" class="rounded-lg h-[250px] w-full" /> 
           ${video.others.posted_date > 0 ? '<p class="absolute bg-black text-white font-bold rounded-lg p-2 right-2 bottom-2">'+ time1 +'<p/>': ''} 
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
        const preNumbers = parseFloat(video.others.views.slice(0, 3));
        // console.log(preNumbers);
        primaryArray.push(preNumbers);
        

        primaryArray.sort(function(a, b) {
          return b - a; 
        });

        // console.log(primaryArray);
        
    videoContainer.appendChild(videoCard);

  })
}
loadBtn();
handleBtn(1000);