const loadPhotos = (req, res, usersPhotosLinks) => {
  const body = JSON.parse(req.body)
  usersPhotosLinks[body.id] = body.photos.split('|');
  res.json({ message: "Success" });
}

module.exports = { loadPhotos }