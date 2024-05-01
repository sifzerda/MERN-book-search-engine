const typeDefs = `

type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Query {
    me: [User]
}

type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    saveBook(bookId: String!): User
    deleteBook(bookId: String!): User
}
`;

module.exports = typeDefs;
