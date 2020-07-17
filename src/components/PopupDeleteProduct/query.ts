import { gql } from "apollo-boost";

export const photoProductsToDel = gql`
  query photoProductsToDel($id: ID) {
    product(id: $id) {
      photos
    }
  }
`;
