require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const schema = require('./schema/schema.js');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const Products = require('./models/product')
const btoa = require('btoa')
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

const getOrders = async () => {
  const res = await fetch(
    "https://online.moysklad.ru/api/remap/1.1/report/stock/all?limit=1000",
    {
      headers: {
        Authorization: `basic ${b64EncodeUnicode(
          `${process.env.MySkladLogin}:${process.env.MySkladPass}`
        )}`,
        header: "X-RateLimit-Remaining",
      },
    }
  );

  const json = (await res.json()).rows;

  return json.map(obj => ({
    articul: obj.code,
    stock: obj.stock,
    price: obj.salePrice.toString().split('').slice(0, -2).join(''),
  }));
};

function b64EncodeUnicode(str) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(
      _,
      p1
    ) {
      return String.fromCharCode(+`0x${p1}`);
    })
  );
}

setInterval(() => {
  Products.find({}).select().exec()
    .then(async (token) => {
      await getOrders().then(orders => {
        for (let i = 0; i < token.length; i++) {
          const sizes = JSON.parse(token[i].sizes).map(size => {
            const stock = orders.find(order => order && +order.articul === +size.articul);

            return {
              size: size.size,
              articul: size.articul,
              stock: stock ? `${stock.stock}` : "0",
            }
          });
          const id = token[i]._id;

          if (!(JSON.stringify(sizes) === token[i].sizes)) {
            Products.findByIdAndUpdate(
              id,
              { sizes: JSON.stringify(sizes) },
              { new: true },
              (err, user) => {

                if (err) return console.log(err);
                console.log("Остатки синхронизированы");
              })
          }

          if (orders.price && orders.price !== token[i].price) {
            Products.findByIdAndUpdate(
              id,
              { price: orders.price },
              { new: true },
              (err, user) => {

                if (err) return console.log(err);
                console.log("Цены сихронизированы");
              })
          }
        }
      }).catch(e => console.log(e))
    });
}, 120000)

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
