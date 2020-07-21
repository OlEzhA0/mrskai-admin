// app.post('/clearPhotos', bodyParser.text(), (req, res) => {
//   usersPhotosLinks[req.body] = [];
//   res.json({ message: "Success" });
// });

// app.put('/loadPhotos', bodyParser.text(), (req, res) => {
//   const body = JSON.parse(req.body)
//   usersPhotosLinks[body.id] = body.photos.split('|');
//   res.json({ message: "Success" });
// })