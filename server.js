const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

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

app.get('/api/notes', async (req, res) => {
    console.log("GET api/notes");
    let dbData = await fs.readFile('./db/db.json', 'utf-8');
    const parDBData = JSON.parse(dbData);
    return res.json(parDBData);
})

app.post('/api/notes', async (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        try {
            const newNote = {
                id: uuidv4(),
                title,
                text,
            };
            
            let readFS = await fs.readFile('./db/db.json', 'utf-8');
            
            const parsedNote = JSON.parse(readFS);
            parsedNote.push(newNote);
    
            await fs.writeFile('./db/db.json', JSON.stringify(parsedNote, null, 4));
    
            const response = {
                status: 'success',
                body: newNote,
            }
    
            console.log(response);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json('Error in posting review');
        }
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