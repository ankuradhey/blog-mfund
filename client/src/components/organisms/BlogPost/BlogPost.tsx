import React, { FC, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { useToasts } from "react-toast-notifications";
import { Button, Col } from "react-bootstrap";
import { Loader } from "../../atoms/Loader";
import { BlogPostType } from "../../../types/BlogPostType";
import { DELETE_POST, GET_POSTS } from "../../../graphql/Queries";
import { AlertMessage } from "../../atoms/AlertMessage";
import { BlogPostResponse } from "../../../types";

interface BlogPostProps extends BlogPostType {
    full?: boolean;
}

const BlogPost: FC<BlogPostProps> = ({
    slug,
    coverImage,
    coverImageAlt,
    title,
    content,
    full = false,
}) => {
    const history = useHistory();
    const { addToast } = useToasts();
    const [deleteBlog, { loading, error }] = useMutation(DELETE_POST, {
        onCompleted: () => {
            addToast("Post successfully deleted!", {
                appearance: "success",
                autoDismiss: true,
            });
            if (full) {
                history.replace("/");
            }
        },
    });

    const deletePost = (slug: string): void => {
        if (slug) {
            deleteBlog({
                optimisticResponse: true,
                variables: { slug },
                update: (cache) => {
                    // Fetch the posts from the cache
                    let existingPosts: BlogPostResponse | null = cache.readQuery({
                        query: GET_POSTS,
                    });
                    existingPosts = existingPosts || { posts: [] };
                    // Add the new todo to the cache
                    const newPost = existingPosts.posts.filter(
                        (val: BlogPostType) => val.slug !== slug
                    );
                    cache.writeQuery({
                        query: GET_POSTS,
                        data: { posts: [...newPost] },
                    });
                },
            });
        }
    };

    if (error) return <AlertMessage variant="danger" message="Some error occurred" />;

    if (!slug || !title) {
        return <p>Not found</p>;
    }

    if (!full) {
        content = content.substring(0, 200);
    } else if (full && loading) {
        return <Loader />;
    }

    return (
        <section key={slug} className="card">
            <img src={coverImage} alt={coverImageAlt} />
            <div className="card-content">
                <h2>{title}</h2>
                <p
                    dangerouslySetInnerHTML={{
                        __html: `${content}`,
                    }}
                ></p>
                <p>{!full && <Link to={`/${slug}`}>Continue reading...</Link>}</p>
                <Button variant="secondary" size="sm" as={Col} md={2} className="pull-left mr-5">
                    Edit
                </Button>
                <Button
                    disabled={loading}
                    variant="danger"
                    size="sm"
                    as={Col}
                    md={2}
                    onClick={() => deletePost(slug)}
                >
                    Delete
                </Button>
            </div>
        </section>
    );
};

export default BlogPost;
