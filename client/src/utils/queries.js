import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me  {
    me {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            title
            description
            image
            link
            authors
        }
    }
}
`;

