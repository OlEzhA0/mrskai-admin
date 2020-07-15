export async function postData(formData: any) {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
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
  const res = await fetch(`${process.env.REACT_APP_API_URL}/takePhotos`);
  const json = await res.json();

  return json;
}
