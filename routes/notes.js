const fb = require('express').Router();
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

fb.get('/', async (req, res) => {
    try {
        let dbData = await fs.readFile('./db/db.json', 'utf-8');
        const parDBData = JSON.parse(dbData);
        
        return res.json(parDBData);
    } catch (error) {
        console.log(error);
        res.status(500).json('Error in retrieving notes.');
    }
});

fb.post('/', async (req, res) => {
    try {
        const { title, text } = req.body;

        if (title && text) {
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
                status: 'Success',
                body: newNote,
            }

            console.log(response.status, '\nNew Note has been saved to db.json!');
            res.status(201).json(response);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Error in posting note.');
    }
});

fb.delete('/:id', async (req, res) => {
    try {
        const noteID = req.params.id;

        const noteDB = await fs.readFile('./db/db.json', 'utf-8');
        let parsedNoteDB = JSON.parse(noteDB);
        const noteIndex = parsedNoteDB.findIndex(n => n.id === noteID);
        parsedNoteDB.splice(noteIndex, 1);

        await fs.writeFile('./db/db.json', JSON.stringify(parsedNoteDB, null, 4));

        const response = {
            status: 'Success'
        }

        console.log(response.status, '\nNote has been deleted from db.json!');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json('Error in deleting note.');
    }
})

module.exports = fb;