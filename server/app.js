const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');
require('dotenv').config()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { uploadFile } = require('./upload');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const schema = require('./schema/schema.js');
const bodyParser = require('body-parser');
const links = [];
const app = express();

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.set('Access-Control-Allow-Headers', 'contenttype');
  next()
})

mongoose.connect(
  process.env.DATABASE_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useMongoClient: true }
)

app.use(express.static('build'));
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
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

app.get('/clearPhotos', (req, res) => {
  links.length = 0;
});

const dbContection = mongoose.connection;
dbContection.on('error', err => console.log(`Contection error: ${err}`));
dbContection.once('open', () => console.log('Connected to DB'))

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');
});
