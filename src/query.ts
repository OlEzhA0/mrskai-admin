import { gql } from "apollo-boost";

export const getUserQuery = gql`
  query getUserQuery($id: ID!) {
    user(id: $id) {
      id
      name
      rights
      type
    }
  }
`;
