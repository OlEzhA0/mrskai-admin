const checkPhotos = (req, res, usersPhotosLinks) => {
  const { id, photo } = JSON.parse(req.body);
  if (usersPhotosLinks[id] && usersPhotosLinks[id].some(
    serverPhoto => serverPhoto === `https://${process.env.Bucket}.s3.amazonaws.com/${photo}`
  )) {
    res.json("is already")
  } else {
    res.json("no yet")
  }
}

module.exports = { checkPhotos }