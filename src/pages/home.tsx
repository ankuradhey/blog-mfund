import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getFirebase } from "../firebase";
import { client } from "../index";
import { gql } from "apollo-boost";

interface blogPostType {
    title: string;
    content: string;
    coverImage: string;
    coverImageAlt?: string;
    slug: string;
    dateFormatted: Date;
    datePretty: Date;
}

const Home = () => {
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

                //const newestFirst = posts.reverse();
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
                <section key={blogPost.slug} className="card">
                    <img src={blogPost.coverImage} alt={blogPost.coverImageAlt} />
                    <div className="card-content">
                        <h2>
                            {blogPost.title} &mdash;{" "}
                            <span style={{ color: "#5e5e5e" }}>{blogPost.datePretty}</span>
                        </h2>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: `${blogPost.content.substring(0, 200)}...`,
                            }}
                        ></p>
                        <Link to={`/${blogPost.slug}`}>Continue reading...</Link>
                    </div>
                </section>
            ))}
        </>
    );
};

export default Home;
