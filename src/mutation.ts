import { gql } from "apollo-boost";

export const deleteProductMutation = gql`
  mutation deleteProductMutation($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

export const addProductMutation = gql`
  mutation addProductMutation(
    $title: String!
    $descr: String!
    $color: String!
    $price: String!
    $modelParam: String!
    $composition: String!
    $sizes: String!
    $lastPrice: String!
    $type: String!
    $photos: [String!]
    $previewPhoto: String!
    $care: String!
  ) {
    addProduct(
      title: $title
      descr: $descr
      color: $color
      price: $price
      modelParam: $modelParam
      composition: $composition
      sizes: $sizes
      lastPrice: $lastPrice
      type: $type
      photos: $photos
      previewPhoto: $previewPhoto
      care: $care
    ) {
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
      photos
      previewPhoto
      care
    }
  }
`;

