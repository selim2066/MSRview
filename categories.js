const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(response => response.json())
        .then(data => displayCat(data.categories))
        .catch(error => console.log(error))
}

function displayCat(categories) {

    const catContainer = document.getElementById('categories')
    categories.forEach(element => {
        // console.log(element)
        const btn = document.createElement('button')
        btn.classList.add('btn', 'w-35', 'h-20', 'text-3xl', 'btn-neutral', 'btn-dash')
        btn.innerText = element.category

        catContainer.appendChild(btn)


    });
}


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
const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(response => response.json())
        .then(data => displayVid(data.videos))
        // .then(data => displayVid(data.categories))
        .catch(error => console.log(error))

}
function displayVid(videos) {
    console.log(videos);
    const videoContainer = document.getElementById('videoContainer')
    videos.forEach(video => {
        const card = document.createElement('div')
        const thumbnail = video.thumbnail
        const title = video.title
        // const author = video.author
        const author = video.authors[0].profile_name;
        const views = video.others.views
        const authorImg = video.authors[0].profile_picture;
        const verified = video.authors[0].verified
        const postDate = video.others.posted_date

       function formatFullTime(seconds) {
  const units = [];

  const years = Math.floor(seconds / (365 * 24 * 60 * 60));
  if (years) units.push(`${years}y`);
  seconds %= (365 * 24 * 60 * 60);

  const days = Math.floor(seconds / (24 * 60 * 60));
  if (days) units.push(`${days}d`);
  seconds %= (24 * 60 * 60);

  const hours = Math.floor(seconds / 3600);
  if (hours) units.push(`${hours}h`);
  seconds %= 3600;

  const minutes = Math.floor(seconds / 60);
  if (minutes) units.push(`${minutes}m`);

  const secs = seconds % 60;
  if (secs || units.length === 0) units.push(`${secs}s`); // always show seconds if nothing else

  return units.join(' ');
}

        console.log(postDate);

        console.log(author);
        // console.log(video);

        card.classList.add(
            'card',
            'bg-base-100',
            'shadow-sm',
            'sm:w-[550px]',
            'lg:w-full',
            'md:h-[550px]'
        );
        card.innerHTML = ` <figure class='h-[400px] relative'>
                <img class='h-full w-full object-cover' src="${thumbnail}" alt="Shoes" />
               

                 ${postDate ? `<span class='absolute text-white right-4 bottom-4 bg-black p-2 rounded-md'>${formatFullTime(postDate)}</span>` : ''}



            </figure>


             <div class="py-3 px-1 flex gap-5">
                <div>
                    <img class="w-16 h-16 rounded-full object-cover" src="${authorImg}" alt="">
                </div>
                <div class='space-y-3'>
                    <h2 class="card-title font-bold text-3xl">${title
            }</h2>
                    <div class="flex gap-3">
                        <p class="text-xl font-semibold text-gray-500">${author}</p>

                        ${verified === true ? `<img class="w-8" src="https://img.icons8.com/?size=100&id=2AuMnRFVB9b1&format=png&color=000000"
                            alt="">` : ''}
                        
                    </div>
                    <p class="text-xl">${views}</p>
                </div>

            </div>
        `;

        videoContainer.appendChild(card)

    })
}
// button
/**<div class="card-actions justify-end">
                    <button class="btn btn-neutral btn-dash hover:bg-red-700 hover:border-none text-xl w-34 h-16">Watch</button>
                </div> */
// https://openapi.programming-hero.com/api/phero-tube/videos

loadCategories()
loadVideos()