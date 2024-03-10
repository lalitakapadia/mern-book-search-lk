const {gql} = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String
    bookCount: INT
    savedBooks: [Book]
    }

    input SavedBookInput {
        author: [String]
        description: String
        title: String!
        bookId: String!
        image: String
        link: String
    }
    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me:User
    }

    type Mutations {
        login(email:String!, password:String!): Auth
        addUser(username:String!, email:String!, password:String!): Auth
        saveBook(bookData: SavedBookInput!): User
        removeBook(bookId: ID!): User
    }`;

    module.exports = typeDefs;