const express = require('express');
const app = express();
const port = 3000;

const { Client } = require('pg');

// Database connection configuration
const dbConfig = {
    user: 'root',
    password: 'root',
    host: 'localhost',
    port: 5432,
    database: 'database',
};

// Create a new PostgreSQL client
const client = new Client(dbConfig);
const data;
client.connect()
    .then(() => {
    console.log('Connected to PostgreSQL database');

    const getTableQuizz = `
    SELECT * FROM quizz;
    `;

    client.query(getTableQuizz, (err, result) => {
        if (err) {
            console.error('Error removing table QuizzQuestion', err);
        } else {
            data = result;
            console.log('Table QuizzQuestion removed successfully ');
        }
    });
    })
    .catch((err) => {
        console.error('Error connecting to PostgreSQL database', err);
    });

// Route pour envoyer des données
app.get('/api/getAllQuizz', (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});