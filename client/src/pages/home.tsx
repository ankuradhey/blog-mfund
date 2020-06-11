import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_POSTS, DELETE_POST } from "../graphql/Queries";
import { BlogPost } from "../components/organisms/BlogPost";
import { BlogPostResponse, BlogPostType } from "../types";
import { Loader } from "../components/atoms/Loader";
import { AlertMessage } from "../components/atoms/AlertMessage";

export const Home = () => {
    const { data, loading, error } = useQuery<BlogPostResponse>(GET_POSTS);

    if (loading) return <Loader />;

    if (error) return <AlertMessage variant="danger" message="Some error occurred" />;

    return (
        <>
            <h1>Blog posts</h1>
            <p>Welcome</p>
            {data &&
                data.posts &&
                data.posts.map((blogPost) => (
                    <BlogPost key={blogPost.slug} {...blogPost}></BlogPost>
                ))}
        </>
    );
};
