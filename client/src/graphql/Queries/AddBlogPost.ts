import gql from "graphql-tag";

export const ADD_POST = gql`
    mutation AddPost($details: AddPostInput!) {
        addPost(details: $details) {
            title
            slug
            content
            coverImage
        }
    }
`;
