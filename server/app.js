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

mongoose.connect(`mongodb+srv://admin:NfoSAy2ePnJVQE36@mrskai.g24zh.azure.mongodb.net/database?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
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

app.post('/clearPhotos', (req, res) => {
  console.log('clear');
  links = [];
  res.json({ message: "Success" });
});

app.post('/deletePhotoS3', bodyParser.text(), (req, res) => {
  deleteFile(req.body.split(`https://${process.env.Bucket}.s3.amazonaws.com/`)[1]);
  links = links.filter(link => link !== req.body);
  res.json({ status: "success" })
})

app.put('/loadPhotos', bodyParser.text(), (req, res) => {
  req.body.split('|').forEach(photo => links.push(photo))
  res.json({ message: "Success" });
})

const dbContection = mongoose.connection;
dbContection.on('error', err => console.log(`Contection error: ${err}`));
dbContection.once('open', () => console.log('Connected to DB'))

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');
});

// mutation ($title: String!, $descr: String!, $color: String!, $price: String!, $modelParam: String!, $composition: String!, $sizes: String!, $lastPrice: String!, $type: String!, $photos: [String!], $previewPhoto: String!, $care: String!) {
//   addProduct(title: $title, descr: $descr, color: $color, price: $price, modelParam: $modelParam, composition: $composition, sizes: $sizes, lastPrice: $lastPrice, type: $type, photos: $photos, previewPhoto: $previewPhoto, care: $care) {
//     id
//     title
//     descr
//     color
//     price
//     modelParam
//     composition
//     sizes
//     lastPrice
//     care
//     type
//     photos
//     previewPhoto
//   }
// }
