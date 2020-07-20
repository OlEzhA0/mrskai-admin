const UPLOAD_URL = process.env.REACT_APP_UPLOAD_FILE;
const RELOAD_URL = process.env.REACT_APP_RELOAD_FILE;
const DELETE_ALL = process.env.REACT_APP_CLEAR_PHOTOS;

export async function postData(formData: any) {
  const res = await fetch(`${UPLOAD_URL}`, {
    method: "POST",
    headers: {
      ContentType: "text/html; charset: utf-8",
    },
    body: formData,
  });

  const json = await res.json();
  return json;
}

export const getPhotos = async () => {
  const res = await fetch(`${RELOAD_URL}`);
  const json = await res.json();

  return json;
};

export const deleteAllPhotosFromServer = async () => {
  await fetch(`${DELETE_ALL}`, {
    method: "POST",
  });
};

export const deletePhotoS3 = async (photo: string) => {
  const res = await fetch(`${process.env.REACT_APP_DELETE_PHOTOS3}`, {
    method: "POST",
    body: photo,
  });
  const json = await res.json();

  return json;
};

export const loadPhotos = async (photos: string[]) => {
  await fetch(`${process.env.REACT_APP_LOAD_PHOTOS}`, {
    method: "PUT",
    body: photos.join("|"),
  });
};