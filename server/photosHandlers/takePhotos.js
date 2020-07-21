const takePhotos = (req, res, usersPhotosLinks) => {
  res.json(usersPhotosLinks[req.body] || []);
}

module.exports = { takePhotos }