import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_POSTS } from "../graphql/Queries";
import { BlogPost } from "../components/organisms/BlogPost";
import { BlogPostResponse } from "../types";
import { Loader } from "../components/atoms/Loader";
import { Notification } from "../components/atoms/Notification";

export const Home = () => {
    const { data, loading, error } = useQuery<BlogPostResponse>(GET_POSTS);

    if (loading) return <Loader />;

    if (error) return <Notification variant="danger" message="Some error occurred" />;

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
