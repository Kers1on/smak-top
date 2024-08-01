document.getElementById('dishForm').addEventListener('submit', function(event) {
    event.preventDefault();

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

            const dish = {
                photo: photoDataUrl,
                title: title,
                description: description
            };

            fetch('/api/dishes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dish)
            })
            .then(response => response.json())
            .then(data => {
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
            const dish = {
                title: title,
                description: description
            };

            fetch('/api/dishes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dish)
            })
            .then(response => response.json())
            .then(data => {
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