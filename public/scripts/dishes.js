document.addEventListener('DOMContentLoaded', function() {
    window.deleteDish = function(button) {
        const dishElement = button.closest('.dish');

        const dishId = dishElement.getAttribute('data-id');

        if (!dishId) {
            console.error('ID блюда не знайдено');
            return;
        }

        fetch(`/api/dishes/${dishId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Помилка при видаленні блюда');
            }
            dishElement.remove();
            alert('Блюдо успішно видалено');
        })
        .catch(error => {
            console.error('Помилка:', error);
            alert('Сталася помилка при видаленні блюда');
        });
    };

    function loadDishes() {
        fetch('/api/dishes')
        .then(response => response.json())
        .then(dishes => {
            const dishesDiv = document.getElementById('dishes');
            dishes.forEach(dish => {
                const dishElement = document.createElement('div');
                dishElement.classList.add('dish');
                dishElement.setAttribute('data-id', dish.id);
                dishElement.innerHTML = `
                    <img src="${dish.photo}" alt="${dish.title}">
                    <div class="dish-name">${dish.title}</div>
                    <div class="dish-describing">${dish.description}</div>
                    <a href="dish.html?id=${dish.id}">Читати далі</a>
                    <button onclick="deleteDish(this)">Видалити</button>
                `;
                dishesDiv.appendChild(dishElement);
            });
        })
        .catch(error => console.error('Помилка:', error));
    }

    loadDishes();
});