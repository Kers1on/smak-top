const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

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

app.get('/api/dishes/:id', (req, res) => {
    const dishId = req.params.id;

    fs.readFile(DB_FILE, 'utf-8', (err, data) => {
        if (err) {
            console.error('Помилка читання бази даних', err);
            return res.status(500).send('Помилка читання бази даних');
        }
        const dishes = JSON.parse(data || '[]');
        let dish = dishes.find(dish => dish.id === dishId);

        if (dish) {
            res.json(dish);
        } else {
            res.status(404).send('Блюдо не знайдено');
        }
    });
});

app.post('/api/dishes', (req, res) => {
    const newDish = req.body;
    newDish.id = uuidv4();

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

app.delete('/api/dishes/:id', (req, res) => {
    const dishId = req.params.id;

    fs.readFile(DB_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Помилка читання бази даних');
        }
        let dishes = JSON.parse(data || '[]');

        dishes = dishes.filter(dish => dish.id !== dishId);

        fs.writeFile(DB_FILE, JSON.stringify(dishes, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Помилка запису бази даних');
            }
            res.status(204).send();
        });
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
});