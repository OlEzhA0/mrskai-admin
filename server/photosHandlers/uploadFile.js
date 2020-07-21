const { uploadFile } = require('../upload');


const uploadToServer = (req, res) => {
  const result = req.files[0];
  const answerLink = uploadFile(result.path, result.originalname);
  res.json(answerLink);
}

module.exports = { uploadToServer }