const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'dishes.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/api/dishes', (req, res) => {
    fs.readFile(DB_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Помилка читання бази даних');
        }
        const dishes = JSON.parse(data || '[]');
        res.json(dishes);
    });
});

app.post('/api/dishes', (req, res) => {
    const newDish = req.body;

    fs.readFile(DB_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Помилка читання бази даних');
        }
        const dishes = JSON.parse(data || '[]');
        dishes.push(newDish);

        fs.writeFile(DB_FILE, JSON.stringify(dishes, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Помилка запису бази даних');
            }
            res.status(201).json(newDish);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
});