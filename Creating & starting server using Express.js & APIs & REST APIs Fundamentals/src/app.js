const express = require('express'); /* Importing the Express framework */
const app = express(); /* Creating an instance of the Express application */
app.use(express.json()); /** Middleware to parse JSON bodies */
const notes = []; /* Array to store notes */
/** title, description */
/** POST is method /notes is the API name. */
app.post('/notes', (req, res) => { /* Adding a new note to the notes array */
    notes.push(req.body); /* req.body contains the data sent in the request body */
    res.status(201).send({ message: 'Note added successfully' }); /* Sending a response with status code 201 (Created) and a success message */
});
/** GET is method /notes is the API name. */
app.get('/notes', (req, res) => { /* Fetching all notes from the notes array and sending them in the response */
    res.status(200).send({ notes: 'Notes fetched successfully', notes : notes }); /* Sending a response with status code 200 (OK) and the notes data */
});
/** DELETE is method /notes/1 */
app.delete('/notes/:index', (req, res) => { /* Deleting a note from the notes array based on the index provided in the URL parameter */
    const index = req.params.index;/* Converting the index from the URL parameter to a zero-based index */
    delete notes[index]; /* Deleting the note at the specified index from the notes array */
    res.status(204).send({ message: 'Note deleted successfully' }); /* Sending a response with status code 204 (No Content) and a success message */
});
app.patch('/notes/:index', (req, res) => { /* Updating a note in the notes array based on the index provided in the URL parameter */
    const index = req.params.index; /* Converting the index from the URL parameter to a zero-based index */
    const description = req.body.description; /* Extracting the new description from the request body */
    notes[index].description = description; /* Updating the description of the note at the specified index in the notes array */
    res.status(200).send({ message: 'Note updated successfully' }); /* Sending a response with status code 200 (OK) and a success message */
});
module.exports = app;

