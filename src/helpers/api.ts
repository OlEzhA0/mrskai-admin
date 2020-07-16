const URL = process.env.REACT_APP_SERVER || "http://localhost:5000";
const UPLOAD_URL = process.env.REACT_APP_UPLOAD_FILE;
const RELOAD_URL = process.env.REACT_APP_RELOAD_FILE;
const DELETE_URL = process.env.REACT_APP_DELETE_PHOTO;
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

export const deleteFromServer = async (link: string) => {
  await fetch(`${DELETE_URL}`, {
    method: "PUT",
    body: link,
  });
};

export const deleteAllPhotosFromServer = async (model: string) => {
  await fetch(`${DELETE_ALL}`, {
    method: "PUT",
    body: model,
  })
}
