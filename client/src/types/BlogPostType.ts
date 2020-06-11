export interface BlogPostType {
    title: string;
    content: string;
    coverImage: string;
    coverImageAlt?: string;
    slug: string;
    dateFormatted: Date;
    datePretty: Date;
}
