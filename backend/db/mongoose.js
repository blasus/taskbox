const mongoose = require('mongoose');

// MongoDB details
//const USER = 'admin';
//const PASSWORD = 'NEcPvD8sc31ARNfI';
const DB = 'taskbox';

// mongodb connection
//const uri = `mongodb+srv://${USER}:${PASSWORD}@cluster0-fb1-9edpa.mongodb.net/${DB}?retryWrites=true&w=majority`;
const uri = `mongodb://127.0.0.1:27017/${DB}`;
mongoose.Promise = global.Promise;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;

// connection successful
connection.once('open', () => console.log('MongoDB database connection established successfully'));
// error handler
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = mongoose;