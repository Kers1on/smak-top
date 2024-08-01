document.addEventListener('DOMContentLoaded', function() {
    // Отримуємо параметр id з URL
    const params = new URLSearchParams(window.location.search);
    const dishId = params.get('id');

    if (dishId) {
        fetch(`api/dishes/${dishId}`)
        .then(response => response.json())
        .then(dish => {
            const recipeDiv = document.getElementById('recipe');
            const recipeElement = document.createElement('div');
            recipeElement.classList.add('recipe');
            recipeElement.setAttribute('data-id', dish.id);
            recipeElement.innerHTML = `
                <div class="photo">
                    <img src="${dish.photo}" alt="${dish.title}">
                </div>
                <h1 class="title">${dish.title}</h1>
                <p class="description">${dish.description}</p>
            `;
            recipeDiv.appendChild(recipeElement);

            const title = document.createElement('title');
            title.innerHTML = `${dish.title}`;
            recipeDiv.appendChild(title);
        })
        .catch(error => console.error('Помилка:', error));
    } else {
        console.error('Не вказано id страви');
    }
});