import React, { FC } from "react";
import { Form, Col } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { FormValues, OtherProps } from "./index";

const SignupSchema = Yup.object().shape({
    title: Yup.string().min(2, "Too Short!").max(200, "Too Long!").required("Required"),
    content: Yup.string().min(2, "Too Short!").required("Required"),
    coverImage: Yup.string().url(),
    slug: Yup.string().required("Required"),
});

const BlogForm: FC<{ message: string; handleFormSubmit: any; initialValues: FormValues }> = ({
    message,
    handleFormSubmit,
    initialValues,
}) => {
    const formik = useFormik({
        initialValues,
        onSubmit: handleFormSubmit,
        validationSchema: SignupSchema,
    });

    const { touched, errors, isSubmitting, values, handleSubmit, handleChange } = formik;

    return (
        <Form noValidate onSubmit={handleSubmit}>
            <h1>{message}</h1>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={values.title}
                        isInvalid={!!errors.title}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId="validationFormik102">
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                        type="text"
                        name="slug"
                        value={values.slug}
                        isInvalid={!!errors.slug}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">{errors.slug}</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Cover Image</Form.Label>
                    <Form.Control
                        type="text"
                        name="coverImage"
                        value={values.coverImage}
                        isInvalid={!!errors.coverImage}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.coverImage}
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        type="text"
                        name="content"
                        value={values.content}
                        isInvalid={!!errors.content}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">{errors.content}</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <button type="submit" disabled={formik.isSubmitting}>
                Submit
            </button>
        </Form>
    );
};

export default BlogForm;
