const express = require('express');
const path = require('path');
const fs = require('fs');
const dbData = require('./db/db.json')

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})

app.get('/api/notes', (req, res) => {
    return res.json(dbData);
})

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
        };
        
        fs.readFile('./db/db.json', 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNote = JSON.parse(data);
                parsedNote.push(newNote);

                fs.writeFile('./db/db.json', JSON.stringify(parsedNote, null, 4), (err) => {
                    err ? console.error(err) : console.log('A new note has been added to db.json!')
                })
            }
        })
        

        const response = {
            status: 'success',
            body: newNote,
        }

        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting review');
    }
})

app.delete('/api/notes/:id', (req, res) => {

})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})