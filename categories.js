//! buttons
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((response) => response.json())
    .then((data) => displayCat(data.categories))
    .catch((error) => console.log(error))
    .then((data) => console.log(data.categories));
};
function displayCat(categories) {
  const catContainer = document.getElementById("categories");
  categories.forEach((element) => {
    const btnContainer = document.createElement("div");
    btnContainer.innerHTML = `
        <button id="btn-${element.category_id}" onclick='showCategoryVideo(${element.category_id})' class='btn w-36 h-20 text-3xl btn-neutral btn-dash category-btn'>${element.category}
        </button>
        `;
    catContainer.appendChild(btnContainer);
  });
}

// category wise display ie button click , active btn
function showCategoryVideo(id) {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((response) => response.json())
    .then((data) => {
      //    remove active from all btn
      removeActive();

      // add active class
      const activeBtn = document.getElementById(`btn-${id}`);
      console.log(activeBtn);
      activeBtn.classList.add("active");

      displayVid(data.category);
    })
    // .then(data => displayVid(data))
    .catch((error) => console.log(error));
}

function removeActive() {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
}

//! videos
// https://openapi.programming-hero.com/api/phero-tube/video/aaac
// fetch video data
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => displayVid(data.videos))
    .catch((error) => console.log(error));
  // .then(data => displayVid(data.categories))
};

// card showing ie template
function displayVid(videos) {
  const videoContainer = document.getElementById("videoContainer");
  videoContainer.innerHTML = "";
  if (videos.length == 0) {
    videoContainer.classList.remove("grid");
    videoContainer.classList.remove(
      "md:grid",
      "md:grid-cols-2",
      "lg:grid-cols-3",
      "2xl:grid-cols-4",
      "gap-10",
      "py-10",
      "px-10",
      "lg:justify-between",
      "sm:flex",
      "flex-col",
      "sm:justify-center",
      "sm:items-center"
    );

    videoContainer.innerHTML = `
 <div class="flex flex-col justify-center items-center">
    <img src="assets/Icon.png" alt="">
    <h1 class="text-5xl text-center">Opps!! No content found</h1>
</div>`;
  } else {
    videoContainer.classList.add(
      "md:grid",
      "md:grid-cols-2",
      "lg:grid-cols-3",
      "2xl:grid-cols-4",
      "gap-10",
      "py-10",
      "px-10",
      "lg:justify-between",
      "sm:flex",
      "flex-col",
      "sm:justify-center",
      "sm:items-center"
    );
  }

  videos.forEach((video) => {
    const card = document.createElement("div");
    const thumbnail = video.thumbnail;
    const title = video.title;
    // const author = video.author
    const author = video.authors[0].profile_name;
    const views = video.others.views;
    const authorImg = video.authors[0].profile_picture;
    const verified = video.authors[0].verified;
    const postDate = video.others.posted_date;

    function formatFullTime(seconds) {
      const units = [];

      const years = Math.floor(seconds / (365 * 24 * 60 * 60));
      if (years) units.push(`${years}y`);
      seconds %= 365 * 24 * 60 * 60;

      const days = Math.floor(seconds / (24 * 60 * 60));
      if (days) units.push(`${days}d`);
      seconds %= 24 * 60 * 60;

      const hours = Math.floor(seconds / 3600);
      if (hours) units.push(`${hours}h`);
      seconds %= 3600;

      const minutes = Math.floor(seconds / 60);
      if (minutes) units.push(`${minutes}m`);

      const secs = seconds % 60;
      if (secs || units.length === 0) units.push(`${secs}s`); // always show seconds if nothing else

      return units.join(" ");
    }

    card.classList.add(
      "card",
      "bg-base-100",
      "shadow-sm",
      "sm:w-[550px]",
      "lg:w-full",
      "md:h-[550px]"
    );
    card.innerHTML = ` <figure class='h-[400px] relative'>
        <img class='h-full w-full object-cover' src="${thumbnail}" alt="Shoes" />
        
        
        ${
          postDate
            ? `<span class='absolute text-white right-4 bottom-4 bg-black p-2 rounded-md'>${formatFullTime(
                postDate
              )}</span>`
            : ""
        }
        
        
        
        </figure>
        
        
        <div class="py-3 px-1 flex gap-5">
        <div>
        <img class="w-16 h-16 rounded-full object-cover" src="${authorImg}" alt="">
        </div>
        <div class='space-y-3'>
        <h2 class="card-title font-bold text-3xl">${title}
        </h2>

        <div class="flex gap-3">
        <p class="text-xl font-semibold text-gray-500">${author}</p>
        
               ${
                 verified === true
                   ? `<img class="w-8" src="https://img.icons8.com/?size=100&id=2AuMnRFVB9b1&format=png&color=000000"
            alt="">`
                   : ""
               }
            
            </div>
                <p class="text-xl">${views}</p>
            
            <button onclick="loadDetails('${
              video.video_id
            }')" class="btn text-xl bg-red-500 rounded-lg text-white  absolute right-5 bottom-3">details</button>
            
            `;

    videoContainer.appendChild(card);
  });
}
const loadDetails = async (vid) => {
  console.log(vid);
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${vid}`;
  const response = await fetch(uri);
  const data = await response.json();
  console.log(data.video);
  displayDetails(data.video);
};

function displayDetails(video) {
  document.getElementById("modalDetails").click()
  const modalContent = document.getElementById('modalContent')
// w1
// document.getElementById('showModalDetails').click()

// way2 
document.getElementById('modalDetails').showModal()

modalContent.innerHTML=`
<img src="${video.t}" alt="">
<p class="text-lg text-red-950 font-bold ">Title: ${video.title}</p>
<p class="text-xm text-red-950 font-bold ">Views: ${video.others.views}</p>
<p class="text-xm   ">${video.description}</p>

`



  //         <!-- Open the modal using ID.showModal() method -->
  // <button class="btn" onclick="my_modal_5.showModal()">open modal</button>
  // <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
  //   <div class="modal-box">
  //     <h3 class="text-lg font-bold">Hello!</h3>
  //     <p class="py-4">Press ESC key or click the button below to close</p>
  //     <div class="modal-action">
  //       <form method="dialog">
  //         <!-- if there is a button in form, it will close the modal -->
  //         <button class="btn">Close</button>
  //       </form>
  //     </div>
  //   </div>
  // </dialog>
}

loadCategories();
loadVideos();

// button
/**<div class="card-actions justify-end">
     <button class="btn btn-neutral btn-dash hover:bg-red-700 hover:border-none text-xl w-34 h-16">Watch</button>
     </div> */
// const btn = document.createElement('button')
// btn.classList.add('btn', 'w-35', 'h-20', 'text-3xl', 'btn-neutral', 'btn-dash')
// btn.innerText = element.category

// catContainer.appendChild(btn)
// https://openapi.programming-hero.com/api/phero-tube/videos
// console.log(element)
/*
     
     updated:
     <div class="card bg-base-100 shadow-sm sm:w-[550px]  lg:w-full">
     <figure>
     <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
     </figure>
     <div class="card-body">
     <h2 class="card-title font-bold text-3xl">Card Title</h2>
     <p class="text-xl">A card component has a figure, a body part, and inside body there are title and actions parts</p>
     <div class="card-actions justify-end">
     <button class="btn btn-primary text-xl w-34 h-16">Buy Now</button>
     </div>
     </div>
     
     </div>
     
     
     
     
     <div class="card bg-base-100 shadow-sm">
     <figure>
     <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
     </figure>
     <div class="card-body">
     <h2 class="card-title font-bold">Card Title</h2>
     <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
     <div class="card-actions justify-end">
     <button class="btn btn-primary">Buy Now</button>
     </div>
     </div>
     </div>
     */
