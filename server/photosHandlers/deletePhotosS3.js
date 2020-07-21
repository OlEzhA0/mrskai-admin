const { deleteFile } = require('../upload')

const deletePhotosS3 = (req, res, usersPhotosLinks) => {
  const { id, photo } = JSON.parse(req.body);
  deleteFile(photo.split(`https://${process.env.Bucket}.s3.amazonaws.com/`)[1]);
  usersPhotosLinks[id] = usersPhotosLinks[id].filter(serverLinks => serverLinks !== photo);
  res.json({ status: "success" })
}

module.exports = { deletePhotosS3 }