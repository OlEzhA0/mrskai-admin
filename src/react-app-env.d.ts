/// <reference types="react-scripts" />
interface Products {
  id: string;
  title: string;
  descr: string;
  color: string;
  price: string;
  modelParam: string;
  care: string;
  composition: string;
  sizes: string;
  lastPrice: string;
  type: string;
  photos: string[];
  previewPhoto: string;
}

interface ProductsPage {
  id: string;
  title: string;
  type: string;
  previewPhoto: string;
  price: string;
  lastPrice: string;
}

interface AdminNav {
  [key: string]: AdminNavItem;
}

interface AdminNavItem {
  name: string;
  img: string;
  link: string;
}

