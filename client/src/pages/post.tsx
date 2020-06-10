import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { gql } from "apollo-boost";
import { client } from "../index";
import { blogPostType } from "./home";
import { BlogPost } from "../components/organisms/BlogPost";

export const Post = ({ match }: RouteComponentProps<{ slug: string }>) => {
    const slug = match.params.slug;
    const [loading, setLoading] = useState(true);
    const [postData, setPostData] = useState<blogPostType | null>(null);

    if (loading && !postData) {
        client
            .query({
                query: gql`
                    {
                        post(slug: "${slug}") {
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
                    data: { post: singlePost },
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

    return postData && <BlogPost {...postData} full={true} />;
};
