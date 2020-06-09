import React, { useState } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { gql } from "apollo-boost";
import { client } from "../index";
import { blogPostType } from "./home";

export const Post = ({ match }: RouteComponentProps<{ slug: string }>) => {
    const slug = match.params.slug;
    const [loading, setLoading] = useState(true);
    const [postData, setPostData] = useState<blogPostType | null>(null);

    if (loading && !postData) {
        client
            .query({
                query: gql`
                    {
                        posts(slug: "${slug}") {
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
                    data: {
                        posts: [singlePost],
                    },
                } = result;
                console.log(singlePost);
                setLoading(false);
                if (singlePost) {
                    setPostData(singlePost);
                }
            });
    }

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <section className="card">
            {postData && (
                <>
                    <img src={postData.coverImage} alt={postData.coverImageAlt} />
                    <div className="card-content">
                        <h1>
                            {postData.title} &mdash;{" "}
                            <span style={{ color: "#5e5e5e" }}>{postData.datePretty}</span>
                        </h1>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: `${postData.content}`,
                            }}
                        ></p>
                    </div>
                </>
            )}
        </section>
    );
};
