import { gql } from "apollo-server";

const typeDefs = gql`
    type Query {
        posts: [Post!]
        post(slug: ID!): Post
    }

    type Result {
        result: String
        slug: ID!
    }

    type Mutation {
        addPost(details: AddPostInput!): Post!
        deletePost(slug: ID!): Result!
        updatePost(details: AddPostInput!, slug: ID!): Post!
    }

    input AddPostInput {
        title: String
        content: String
        coverImage: String
        coverImageAlt: String
        slug: String
        dateFormatted: String
    }

    type Post {
        title: String
        content: String
        coverImage: String
        coverImageAlt: String
        slug: String
        dateFormatted: String
    }
`;

export default typeDefs;
