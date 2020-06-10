import React, { FC } from "react";
import { Link } from "react-router-dom";
import { BlogPostType } from "./index";

interface BlogPostProps extends BlogPostType {
    full?: boolean;
}

const BlogPost: FC<BlogPostProps> = ({
    slug,
    coverImage,
    coverImageAlt,
    title,
    datePretty,
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
                <h2>
                    {title} &mdash; <span style={{ color: "#5e5e5e" }}>{datePretty}</span>
                </h2>
                <p
                    dangerouslySetInnerHTML={{
                        __html: `${content}`,
                    }}
                ></p>
                {full && <Link to={`/${slug}`}>Continue reading...</Link>}
            </div>
        </section>
    );
};

export default BlogPost;
