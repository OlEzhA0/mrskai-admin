export const FieldConfig = {};

export const typeOptions = [
  "Трикотаж",
  "Лен",
  "Топы и блузы",
  "Спорт. костюмы",
  "Пиж. комлпекты",
];

export const fieldsProduct = [
  "title",
  "descr",
  "color",
  "price",
  "modelParam",
  "care",
  "composition",
  "sizes",
  "lastPrice",
  "type",
];

export const ADMIN_PANEL_NAV: AdminNav = {
  analytics: {
    name: "Аналитика",
    img: "images/nav/analytics.svg",
    link: "/analytics",
  },
  products: {
    name: "Товары",
    img: "images/nav/products.svg",
    link: "/products",
  },
  users: {
    name: "Пользователи",
    img: "images/nav/users.svg",
    link: "/users",
  },
  orders: {
    name: "Заказы",
    img: "images/nav/orders.svg",
    link: "/orders",
  },
  settings: {
    name: "Настройки",
    img: "images/nav/settings.svg",
    link: "/settings",
  },
};

export const PRODUCTS_FIELDS = [
  {
    filedName: "descr",
    placeholder: "Описание",
    error: "Заполните правильно поле",
  },
  {
    filedName: "sizes",
    placeholder: "Описание",
    error: "Заполните правильно поле",
  },
  {
    filedName: "modelParam",
    placeholder: "Описание",
    error: "Заполните правильно поле",
  },
  {
    filedName: "care",
    placeholder: "Описание",
    error: "Заполните правильно поле",
  },
  {
    filedName: "composition",
    placeholder: "Описание",
    error: "Заполните правильно поле",
  },
];

export const SIZES_CONFIG: string[] = [
  "XXS",
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "XXXL",
];

export const COLORS = [
  {
    name: "Электрик",
    hex: "#0094ff",
  },
  {
    name: "Красный",
    hex: "#ff2c2c",
  },
  {
    name: "Хаки",
    hex: "#536100",
  },
  {
    name: "Белый",
    hex: "#ffffff",
  },
  {
    name: "Темно-синий",
    hex: "#0046af",
  },
  {
    name: "Мокко",
    hex: "#ceb59d",
  },
  {
    name: "Черный",
    hex: "#000000",
  },
];

export const DEFAULT_FIELDS_PARAMS = {
  title: "",
  descr: "",
  color: "",
  price: "",
  modelParam: "",
  composition: "",
  lastPrice: "",
  type: "",
  care: "",
  previewPhoto: "",
};

export const DEFAULT_FIELDS_ERRORS = {
  title: false,
  descr: false,
  color: false,
  price: false,
  modelParam: false,
  composition: false,
  lastPrice: false,
  sizes: false,
  type: false,
  care: false,
  previewPhoto: false,
};

export const PER_PAGE = ["10", "20", "30"];
export const CATEGORY = ["Все товары", ...typeOptions];

export const defaultSortBy = "Все товары";
export const defaultPage = "1";
export const defaultPerPage = "10";
export const sortBy = "sortBy";
export const page = "page";
export const productsPerPage = "perPage";
