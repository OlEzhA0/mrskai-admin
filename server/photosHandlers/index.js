const { clearPhotos } = require('./clearPhotos');
const { loadPhotos } = require('./loadPhotos');
const { checkPhotos } = require('./checkPhotos')
const { takePhotos } = require('./takePhotos');
const { uploadToServer } = require('./uploadFile');
const { deletePhotosS3 } = require('./deletePhotosS3');

module.exports = {
  clearPhotos,
  loadPhotos,
  checkPhotos,
  takePhotos,
  uploadToServer,
  deletePhotosS3
}