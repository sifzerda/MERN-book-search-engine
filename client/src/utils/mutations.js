import { gql } from '@apollo/client';

export const CREATE_USER = gql` 
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
mutation saveBook($input: saveBook!) {
    saveBook(input: $input) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
}
`;

export const DELETE_BOOK = gql`
mutation deleteBook($bookId: ID!) {
    deleteBook(bookId: $bookId) {
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
}
`;