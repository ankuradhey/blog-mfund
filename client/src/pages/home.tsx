import React, { useState } from "react";
import { Link } from "react-router-dom";
import { client } from "../index";
import { gql } from "apollo-boost";
import { BlogPost } from "../components/organisms/BlogPost";

export interface blogPostType {
    title: string;
    content: string;
    coverImage: string;
    coverImageAlt?: string;
    slug: string;
    dateFormatted: Date;
    datePretty: Date;
}

export const Home = () => {
    const [loading, setLoading] = useState(true);
    const [blogPosts, setBlogPosts] = useState<blogPostType[]>([]);

    if (loading && !blogPosts.length) {
        client
            .query({
                query: gql`
                    {
                        posts {
                            content
                            coverImage
                            slug
                            title
                        }
                    }
                `,
            })
            .then((result) => {
                const {
                    data: { posts },
                } = result;
                console.log(posts);

                setBlogPosts(posts);
                setLoading(false);
            });
    }
    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <h1>Blog posts</h1>
            <p>Welcome</p>
            {blogPosts.map((blogPost) => (
                <BlogPost key={blogPost.slug} {...blogPost}></BlogPost>
            ))}
        </>
    );
};
