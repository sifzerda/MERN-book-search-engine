const typeDefs = `

type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type Auth {
    token: ID!
    user: User
}

input saveBook {
    bookId: String!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type Query {
    me: User
}

type Mutation {

    createUser(
        username: String!, 
        email: String!, 
        password: String!
    ): Auth

    loginUser(
        email: String!, 
        password: String!
    ): Auth

    saveBook(
        input: saveBook
    ): User

    deleteBook(
        bookId: ID!
    ): User
}
`;

module.exports = typeDefs;
