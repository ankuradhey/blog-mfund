import React, { useState, FC } from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ADD_POST } from "../graphql/Queries";
import { client } from "../index";
import { useHistory } from "react-router-dom";
import { BlogForm } from "../components/organisms/BlogForm";
import { Loader } from "../components/atoms/Loader";

interface FormValues {
    title: string;
    content: string;
    coverImage: string;
    coverImageAlt?: string;
    slug: string;
}

const Create = () => {
    const goToHome = () => {
        history.push("/");
    };

    const history = useHistory();
    const [addBlog, { loading, error }] = useMutation(ADD_POST, { onCompleted: goToHome });

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

        addBlog({ variables: { details: newPost } });
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <h1>Create a new post</h1>
            <BlogForm message={error ? "An error occurred" : ""} handleFormSubmit={createPost} />
        </>
    );
};

export default Create;
