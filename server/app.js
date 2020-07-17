const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
require('dotenv').config()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { uploadFile, deleteFile } = require('./upload');
const cors = require('cors');
const schema = require('./schema/schema.js');
let links = [];
const bodyParser = require('body-parser');
const app = express();


const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.set('Access-Control-Allow-Headers', 'origin, contenttype, accept');
  next()
})

app.use(express.json({ extended: true }))

app.use('/auth', require('./routes/login.router'));

mongoose.connect(process.env.MONGODB_URI ||
  `mongodb+srv://${process.env.MongoLogin}:${process.env.MongoPass}@test.emyio.mongodb.net/products?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
)

app.use(express.static('build'));
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
}));

app.post('/upload', upload.any('uploaded_file'), (req, res) => {
  const result = req.files[0];
  if (!links.some(link => link.includes(result.originalname))) {
    const answerLink = uploadFile(result.path, result.originalname);
    links.push(answerLink);
  }
  res.json(links)
})

app.get('/takePhotos', (req, res) => {
  res.json(links)
});

app.put('/clearPhotos', bodyParser.text(), (req, res) => {
  links = []
});

app.post('/deletePhotoS3', bodyParser.text(), (req, res) => {
  deleteFile(req.body.split(`https://${process.env.Bucket}.s3.amazonaws.com/`)[1]);
  links = links.filter(link => link !== req.body);
  res.json({ status: "success" })
})

app.put('/loadPhotos', bodyParser.text(), (req, res) => {
  req.body.split('|').forEach(photo => links.push(photo))
})

const dbContection = mongoose.connection;
dbContection.on('error', err => console.log(`Contection error: ${err}`));
dbContection.once('open', () => console.log('Connected to DB'))

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');
});