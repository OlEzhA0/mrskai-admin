import { gql } from "apollo-boost";

export const productQuery = gql`
  query productQuery($id: ID) {
    product(id: $id) {
      id
      title
      descr
      color
      price
      modelParam
      composition
      sizes
      lastPrice
      care
      type
      photos
      previewPhoto
    }
  }
`;
