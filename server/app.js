require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const schema = require('./schema/schema.js');
const bodyParser = require('body-parser');
const app = express();
const usersPhotosLinks = {};
const PORT = process.env.PORT || 5000;

const {
  clearPhotos,
  loadPhotos,
  checkPhotos,
  takePhotos,
  uploadToServer,
  deletePhotosS3
} = require('./photosHandlers');

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.set('Access-Control-Allow-Headers', 'origin, contenttype, accept');
  next()
})

app.use(express.json({ extended: true }))

app.use('/auth', require('./routes/login.router'));

mongoose.connect(`mongodb+srv://admin:NfoSAy2ePnJVQE36@mrskai.g24zh.azure.mongodb.net/database?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
)

app.use(express.static('build'));
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.post('/upload', upload.any('uploaded_file'), uploadToServer)

app.post('/takePhotos', bodyParser.text(), (req, res) => takePhotos(req, res, usersPhotosLinks));

app.post('/clearPhotos', bodyParser.text(), (req, res) => clearPhotos(req, res, usersPhotosLinks));

app.put('/loadPhotos', bodyParser.text(), (req, res) => loadPhotos(req, res, usersPhotosLinks))

app.post('/checkPhoto', bodyParser.text(), (req, res) => checkPhotos(req, res, usersPhotosLinks))

app.post('/deletePhotoS3', bodyParser.text(), (req, res) => deletePhotosS3(req, res, usersPhotosLinks))

const dbContection = mongoose.connection;
dbContection.on('error', err => console.log(`Contection error: ${err}`));
dbContection.once('open', () => console.log('Connected to DB'))

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');
});

module.exports = { usersPhotosLinks }
