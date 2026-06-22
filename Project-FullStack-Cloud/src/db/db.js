const mongoose = require('mongoose');
async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://aniskhanniazi202_db_user:lNdX4jZevatuT35t@cluster0.e7dankz.mongodb.net/project1_fullstack_cloud', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with an error code
    }
}
module.exports = connectDB; /* Exporting the connectDB function so that it can be imported and used in other parts of the application, such as the server.js file where the server is started and the database connection is established */