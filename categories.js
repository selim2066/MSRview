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
        const thumbnail =video.thumbnail
        const title =video.title
        const description = video.description
        console.log();
        console.log(video);

        card.classList.add(
            'card',
            'bg-base-100',
            'shadow-sm',
            'sm:w-[550px]',
            'lg:w-full'
        );
        card.innerHTML =` <figure>
                <img src="${thumbnail
                }" alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title font-bold text-3xl">${title
                }</h2>
                <p class="text-xl">${description}</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-neutral btn-dash hover:bg-red-700 hover:border-none text-xl w-34 h-16">Watch</button>
                </div>
            </div>
        `;

        videoContainer.appendChild(card)

    })
}

// https://openapi.programming-hero.com/api/phero-tube/videos

loadCategories()
loadVideos()