const clearPhotos = (req, res, usersPhotosLinks) => {
  usersPhotosLinks[req.body] = [];
  res.json({ message: "Success" });
}

module.exports = { clearPhotos }