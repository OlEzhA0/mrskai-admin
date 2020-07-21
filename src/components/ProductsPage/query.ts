import { gql } from "apollo-boost";

export const productsQuery = gql`
  query productsQuery {
    products {
      id
      title
      descr
      color
      price
      modelParam
      composition
      sizes
      lastPrice
      type
      care
      photos
      previewPhoto
      timestamp
    }
  }
`;
