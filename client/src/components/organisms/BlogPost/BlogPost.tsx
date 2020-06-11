import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Col } from "react-bootstrap";
import { BlogPostType } from "../../../types/BlogPostType";

interface BlogPostProps extends BlogPostType {
    full?: boolean;
}

const BlogPost: FC<BlogPostProps> = ({
    slug,
    coverImage,
    coverImageAlt,
    title,
    dateFormatted,
    content,
    full = false,
}) => {
    if (!full) {
        content = content.substring(0, 200);
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
                <Button variant="danger" size="sm" as={Col} md={2}>
                    Delete
                </Button>
            </div>
        </section>
    );
};

export default BlogPost;
