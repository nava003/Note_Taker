const express = require('express');
const path = require('path');
const fs = require('fs');
const dbData = require('./db/db.json')

const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.get('*', (req, res) => {
    
})

app.get('/notes', (req, res) => {
    
})

app.get('/api/notes', (req, res) => {
    
})

app.post('/api/notes', (req, res) => {

})

app.delete('/api/notes/:id', (req, res) => {

})

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})