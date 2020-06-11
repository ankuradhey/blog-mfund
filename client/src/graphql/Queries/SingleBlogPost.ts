import gql from "graphql-tag";

export const GET_SINGLE_POST = gql`
    query getSinglePost($slug: ID!) {
        post(slug: $slug) {
            title
            content
            coverImage
            slug
            dateFormatted
        }
    }
`;
