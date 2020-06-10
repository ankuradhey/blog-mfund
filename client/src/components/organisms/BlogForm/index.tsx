export { default as BlogForm } from "./BlogForm";

export interface OtherProps {
    message: string;
}

export interface FormValues {
    title: string;
    content: string;
    coverImage: string;
    coverImageAlt?: string;
    slug: string;
}
