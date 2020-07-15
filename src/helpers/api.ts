const URL = process.env.REACT_APP_SERVER || 'http://localhost:5000';


export async function postData(formData: any) {
  const res = await fetch(`${URL}/upload`, {
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
  const res = await fetch(`${URL}/takePhotos`);
  const json = await res.json();

  return json;
}
