const loadBtn = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const categories = data.data;
    const btnContainer = document.getElementById('Btn-container');
    categories.forEach(category => {
        const categoryBtn = document.createElement('div');
        categoryBtn.classList = `inline`;
        categoryBtn.innerHTML = `<button class="btn p-3 bg-slate-300 text-black mx-5 text-center" onclick="handleBtn('${category.category_id}')">${category.category}</button>`;
        btnContainer.appendChild(categoryBtn);


        // console.log(data.data);
        // displayBtn(categories);
    })
}

// const displayBtn = categories=>{
//     // console.log(category);
//     // const btnContainer = document.getElementById('Btn-container');
//     // categories.forEach(category => {
//     //     console.log(category);
//     //     const categoryBtn = document.createElement('div');
//     //     categoryBtn.classList = `inline`;
//     //     categoryBtn.innerHTML = `<button class="btn p-3 bg-slate-300 text-black mx-5 text-center" onclick="handleBtn()">${category.category}</button>`;
//     //     btnContainer.appendChild(categoryBtn);
//         // console.log(categories.category);
//     })
// }

// const loadVideo = async()=>{
//     const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${1000}`);
//     const data = await res.json();
//     const videos = data.data;
//     console.log(videos);  
//     // handleBtn(id); 
// }
// loadVideo();
const handleBtn = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    // console.log(data);
    const videoContainer = document.getElementById('videos-container');
    videoContainer.innerHTML = "";
    data.data.forEach(video => {
        // console.log(video.authors.profile_picture);
        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
            <figure><img src="${video.thumbnail}" alt="" class="rounded-lg h-[250px] w-full" /></figure>
            <div class="p-4 flex gap-4 justify-start ">
              <div class="">
                <img src="${video.authors[0].profile_picture}" alt="" class="bg-white b-3 w-[100px] h-[100px] rounded-full">
              </div>
              <div class="">
                <h2 class="card-title">
                  ${video.title}
                  
                </h2>
                <p>${video.authors[0]?.profile_name} <span class="badge badge-secondary">${video.authors[0]?.verified}</span></p>
                <p>${video.others.views} views</p>
              </div>
            </div>
          </div>
        `;
        videoContainer.appendChild(videoCard);
    })
}

document.getElementById('handleSort').addEventListener('click', function(){
    console.log('LOve');
})

const handleSort = async (views)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${views}`)
    const data = res.json();
    console.log(data);
}

loadBtn();
handleBtn(1000);



