import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_SINGLE_POST } from "../graphql/Queries";
import { BlogPost } from "../components/organisms/BlogPost";
import { Loader } from "../components/atoms/Loader";
import { Notification } from "../components/atoms/Notification";

export const Post = (props: RouteComponentProps<any>) => {
    const { match } = props;
    const slug = match.params.slug;
    console.log(slug);
    const { data, loading, error } = useQuery(GET_SINGLE_POST, {
        variables: { slug },
    });

    if (loading) return <Loader />;

    if (error) return <Notification variant="danger" message="Some error occurred" />;

    console.log(data);
    return data && data.post && <BlogPost {...data.post} full={true} />;
};
