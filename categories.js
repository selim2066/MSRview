const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(response => response.json())
        .then(data => displayCat(data.categories))
        .catch(error => console.log(error))
}

function displayCat(categories){
   
    const catContainer = document.getElementById('categories')
    categories.forEach(element => {
        console.log(element)
        const btn =document.createElement('button')
        btn.classList.add('btn', 'w-35', 'h-20', 'text-3xl', 'btn-neutral', 'btn-dash')


        
        btn.innerText=element.category

        catContainer.appendChild(btn)
        
        
    });
}

loadCategories()