document.getElementById('dishForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Збираємо значення з полів форми
    const photo = document.getElementById('photo').files[0];
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if (!title || !description) {
        alert('Будь-ласка заповніть поля');
    } else {
        // Читаємо файл фото як base64
        const reader = new FileReader();
        reader.onloadend = function() {
            const photoDataUrl = reader.result;

            // Створюємо об'єкт JSON з зібраними значеннями
            const dish = {
                photo: photoDataUrl,
                title: title,
                description: description
            };

            // Відправляємо дані на сервер
            fetch('/api/dishes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dish)
            })
            .then(response => response.json())
            .then(data => {
                // Скидаємо форму
                document.getElementById('dishForm').reset();
                alert('Блюдо додано успішно!');
                window.location.href = 'index.html';
            })
            .catch(error => {
                console.error('Помилка:', error);
                alert('Сталася помилка при додаванні блюда.');
            });
        };

        if (photo) {
            reader.readAsDataURL(photo);
        } else {
            // Створюємо об'єкт JSON без фото
            const dish = {
                title: title,
                description: description
            };

            // Відправляємо дані на сервер
            fetch('/api/dishes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dish)
            })
            .then(response => response.json())
            .then(data => {
                // Скидаємо форму
                document.getElementById('dishForm').reset();
                alert('Блюдо додано успішно!');
                window.location.href = 'index.html';
            })
            .catch(error => {
                console.error('Помилка:', error);
                alert('Сталася помилка при додаванні блюда.');
            });
        }
    }

});