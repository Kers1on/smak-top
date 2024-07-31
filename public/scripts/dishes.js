fetch('/api/dishes')
            .then(response => response.json())
            .then(dishes => {
                const dishesDiv = document.getElementById('dishes');
                dishes.forEach(dish => {
                    const dishElement = document.createElement('div');
                    dishElement.setAttribute('class', 'dish');
                    dishElement.innerHTML = `
                        <img src="${dish.photo}">
                        <div class="dish-name">${dish.title}</div>
                        <div class="dish-describing">${dish.description}</div>
                        <a href="dish.html">Читати далі</a>
                    `;
                    dishesDiv.appendChild(dishElement);
                });
            })
            .catch(error => console.error('Помилка:', error));