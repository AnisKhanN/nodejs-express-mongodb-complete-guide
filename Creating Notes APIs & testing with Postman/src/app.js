const express = require('express'); /* Importing the Express framework to create the server and handle routing */
const noteModel = require('./models/note.model'); /* Importing the Note model to interact with the notes collection in the database */
const app = express(); /* Creating an instance of the Express application */
app.use(express.json()); /* Middleware to parse incoming JSON requests, allowing the server to handle JSON data sent in the request body */
app.post('/notes', async (req, res) => {
    const data = req.body; /* Extracting the data from the request body, which should contain the title and description of the note to be created */
    await noteModel.create({ /* Using the create method of the Note model to add a new note to the database with the provided title and description */
        title: data.title,
        description: data.description
    }); /* Using the create method of the Note model to add a new note to the database with the provided title and description */
    res.status(201).json({
        message: 'Note created successfully'
    });
});
app.get('/notes', async (req, res) => {
    const notes = await noteModel.find(); /* Using the find method of the Note model to retrieve all notes from the database. */
    res.status(200).json({message: 'Notes retrieved successfully', notes}); /* Sending a JSON response with a success message and the retrieved notes */
}); 
module.exports = app; /* Exporting the Express app to be used in other parts of the application */
/** Find method 
 * Find => [{_id: '123', title: 'Note 1', description: 'Description 1'}, {_id: '124', title: 'Note 2', description: 'Description 2'}] or []
 * Findone => {_id: '123', title: 'Note 1', description: 'Description 1'} or null
*/
app.delete('/notes/:id', async (req, res) => {
    const id = req.params.id;
    await noteModel.findByIdAndDelete({
        _id: id
    }); /* Using the findByIdAndDelete method of the Note model to delete a note from the database based on the provided ID in the request parameters */
    res.status(200).json({message: 'Note deleted successfully'}); /* Sending a JSON response with a success message indicating that the note was deleted successfully */
});
app.patch('/notes/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    await noteModel.findByIdAndUpdate({
        _id: id
    }, {
        title: data.title,
        description: data.description
    }); /* Using the findByIdAndUpdate method of the Note model to update a note in the database based on the provided ID in the request parameters and the new title and description in the request body */
    res.status(200).json({message: 'Note updated successfully'}); /* Sending a JSON response with a success message indicating that the note was updated successfully */
});