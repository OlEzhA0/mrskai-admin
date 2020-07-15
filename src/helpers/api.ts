export async function postData(formData: any) {
  const res = await fetch(`http://localhost:5000/upload`, {
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
  const res = await fetch(`http://localhost:5000/takePhotos`);
  const json = await res.json();

  return json;
}
