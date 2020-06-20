import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useToasts } from "react-toast-notifications";
import { ADD_POST, GET_SINGLE_POST } from "../graphql/Queries";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { BlogForm } from "../components/organisms/BlogForm";
import { Loader } from "../components/atoms/Loader";
import { SingleBlogPostResponse } from "../types";

interface FormValues {
    title: string;
    content: string;
    coverImage: string;
    coverImageAlt?: string;
    slug: string;
}

const Create = (props: RouteComponentProps<any>) => {
    const {
        match: {
            params: { slug },
        },
    } = props;
    const doUpdate = !!slug;
    const { addToast } = useToasts();

    let initialValues = {
        title: "",
        content: "",
        coverImage: "",
        slug: "",
    };

    const goToHome = () => {
        history.push("/");
    };

    const history = useHistory();

    const { data, loading, error } = useQuery<SingleBlogPostResponse>(GET_SINGLE_POST, {
        variables: { slug },
        skip: !doUpdate,
    });

    const [addBlog] = useMutation(ADD_POST, { onCompleted: goToHome });
    const [updateBlog] = useMutation(ADD_POST, {
        onCompleted: () => {
            addToast("Post successfully updated!", {
                appearance: "success",
                autoDismiss: true,
            });
        },
    });

    const generateDate = () => {
        const now = new Date();
        const options = { month: "long", day: "numeric", year: "numeric" };

        const year = now.getFullYear();
        let monthStr, dayStr;
        let month = now.getMonth() + 1;
        if (month < 10) {
            monthStr = `0${month}`;
        }

        const day = now.getDate();
        if (day < 10) {
            dayStr = `0${day}`;
        }

        return {
            formatted: `${year}-${monthStr}-${dayStr}`,
        };
    };

    const createPost = (values: FormValues) => {
        const { title, slug, coverImage, content } = values;
        const coverImageAlt = "";
        const date = generateDate();
        const newPost = {
            title,
            dateFormatted: date.formatted,
            slug,
            coverImage,
            coverImageAlt,
            content,
        };

        if (doUpdate) {
            updateBlog({ variables: { details: newPost, slug } });
        } else {
            addBlog({ variables: { details: newPost } });
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (data) {
        console.log(data);
        initialValues = { ...initialValues, ...data.post };
    }

    return (
        <>
            <h1>Create a new post</h1>
            <BlogForm
                message={error ? "An error occurred" : ""}
                handleFormSubmit={createPost}
                initialValues={initialValues}
            />
        </>
    );
};

export default Create;
