/// <reference types="react-scripts" />

interface Sizes {
  size: string;
  articul: string;
  stock: string;
}

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
  timestamp: string;
}

interface LocalProduct {
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
  timestamp: string;
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

interface FieldsValidate {
  [key: string]: boolean;
}

interface FieldsParams {
  title: string;
  descr: string;
  color: string;
  price: string;
  modelParam: string;
  composition: string;
  lastPrice: string;
  type: string;
  previewPhoto: string;
  care: string;
  [key: string]: string;
}

interface ErrorsField {
  title: boolean;
  descr: boolean;
  color: boolean;
  price: boolean;
  modelParam: boolean;
  composition: boolean;
  sizes: boolean;
  type: boolean;
  care: boolean;
  previewPhoto: boolean;
  [key: string]: boolean;
}

interface User {
  id: string;
  name: string;
  rights: string;
  type: string;
}
