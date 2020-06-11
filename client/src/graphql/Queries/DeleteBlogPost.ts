import gql from "graphql-tag";

export const DELETE_POST = gql`
    mutation DeletePost($slug: ID!) {
        deletePost(slug: $slug) {
            result
            slug
        }
    }
`;
