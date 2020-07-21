export const cloneObject = (clone: Products, newTitle: string) => ({
  title: newTitle,
  descr: clone.descr,
  color: clone.color,
  price: clone.price,
  modelParam: clone.modelParam,
  composition: clone.composition,
  sizes: clone.sizes,
  lastPrice: clone.lastPrice,
  type: clone.type,
  photos: [],
  care: clone.care,
  previewPhoto: "",
  timestamp: clone.timestamp,
});

export const getTitle = (title: string) => {
  if (!title.includes("(копия)")) {
    return `${title} (копия)`;
  } else {
    return title;
  }
};
