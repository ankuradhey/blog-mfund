import * as admin from "firebase-admin";
import { IResolvers } from "graphql-tools";
import { IBlog } from "./types/blog";
import { ApolloError } from "apollo-server";

admin.initializeApp({
    databaseURL: "https://mutual-fund-blog.firebaseio.com/",
    credential: admin.credential.cert({
        projectId: "mutual-fund-blog",
        privateKey:
            "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCuUpkps7rQ9e6g\nsZ9Wbg+Qksewp8kG2bNgm++X8fKSpPsWOwQ7Rg49/4jz8lTjqp3Ms6J8Fmtzsdu3\nwyrbFHg8iMZanzXo8JavNDoFJg0dkvPLGwUibX8Xrfg5hsfIb+9z+AZGH//WqOT9\nYWfAuRssdwlfjejx0hWE5zOkg1Blj2cYRrfxSj7kVBbmTV4S2kc6pymCyRBISmM2\n21XcCWgtNIHj4Y5AAGZgE2sM7Fv4q8Oexra464imw/F24AT7udxjwzQKheWu5VS9\nIHoWNKw2XOKe2gxdIDg+erS0/silt9hoOSsSmmJVykCk78jh2oN4W13gPELJ8G/O\n6V0UP7ihAgMBAAECggEABcjXIlrU0PS2OfYcRCnpDDpjVA2km7H16YznHjmbZmnB\nLLd24EYmoxXzjBUZ+MeLZAoVHa0V8farDzMeXRB18xvz9A4gLnYsU+JFvMXAAz/C\nUAEvUjlZXCvBUXGzN7JyMFJAwrXdX24cPNBig7Lzb5jAHSqoT2ecn/FBmxIMmmAX\nNmqS+oH3Xn0mZKqSH/HPUZQJGFagoTBAqkUVny1p6kGd9bjXQErKDGIiGqTDAp99\nJTJaso1m2C3mnP+UNoNtUH/MPdVUUgXg/9OfpYjmQ/uroWkG/Z8cVe4ygRdRFZUI\nQU+GfLxYfwZwIvGZXgad3ZrZhbw31NyvN3YRKJ9ziQKBgQDydH9/w/ypCWbJ3c7d\nChFCp89M1tHjqIgl8h4W1D10HuQq20K7Dr6MxaUM/m88D/0InVWcVr/cYTCnecO+\nz9KWUNycHvtZWChCLdOR9CUmF+0PL5pnXeF8ReP7YffRzFNva3c0S8pE7v9nyR7x\nj2lZfqGbgn6eP6uaIEvOcudCOQKBgQC4D7IfCigGDfR7Fkf0/5dkyntL5Q57KvaM\nIt8DqRWW0FtKqHMToHSrJgRiaLICrz3fQ9+aSLtoW/OxtY4e6W5KcWUFw5PogQjK\nkj+c4OniBUXF27JF8pfgI79tZbTXSJTu/MELyGq5NI36bUL8KZxiPh0J2sCctRiq\nt8dY5kkJqQKBgD1fCcsAhBsRmygr8in3W2kg6xNLKTPUPCpGwCENNkUHcL/8YkbR\nM6CUgvPoD6YHcghVMw9w0f3pyBQMeWT6XBbafw0xtnPmIcKmsPA3+ZNL6SC37wCN\nPf9j/ZJrOPytGM2SSUk+igOq75GI0kFZCNSzfhrMDFroSPqphCbM5QbZAoGBAI/X\nNEwtk7mnjjfi4bkFRTrvQgu9peN7X9GELuSdbtG9YpqlqcjczFA0FZkSWIrgiGnC\nkSvxSwPzWC64w6hEpHxowZoPjbdVn5kvUac33Y9Ur4JAfsFLJIV1alQD95+GiV17\nCSI8Lasu9wWN/ZsyqZPdFrRsz7mnjO9dT9yZmtqBAoGBAPG4G5ra/+TBaX3meXr5\n5MDKnkN7uUE0d7JtCTXQy8MkoE2y64k8lxRFMG/eSuqH8BZfhfGElA/oTbdD+kJ1\n+BQzlI1HgQ9LU5fC1wU4+fcEX26/vW3vSumXqRz66K9v0BwZrAM3MdHxxHA5UqZ8\nVeDl2Zcgk3YAeZ3rfXZjn9kk\n-----END PRIVATE KEY-----\n",
        clientEmail: "firebase-adminsdk-n2fg1@mutual-fund-blog.iam.gserviceaccount.com",
    }),
});

const resolvers = {
    Query: {
        posts: async (_: void): Promise<IBlog[]> => {
            const data = await admin.database().ref("posts").once("value");
            let response = data.val();
            return Object.values(response);
        },
        post: async (_: void, args: { slug: string }): Promise<IBlog> => {
            const { slug } = args;
            try {
                const data = await admin.database().ref(`posts/${slug}`).once("value");
                let response = data.val();
                return response;
            } catch (e) {
                throw new ApolloError(e);
            }
        },
    },
    Mutation: {
        addPost: async (_: void, { details }: any) => {
            const { title, content, coverImage, coverImageAlt, slug, dateFormatted } = details;

            try {
                const result = await admin.database().ref().child("posts").child(slug).set({
                    title,
                    content,
                    coverImage,
                    coverImageAlt,
                    slug,
                    dateFormatted,
                });

                return {
                    success: result,
                    message: "Record successfully added",
                    ...details,
                };
            } catch (e) {
                throw new ApolloError(e);
            }
        },
        updatePost: async (_: void, { details, slug }: any) => {
            const { title, content, coverImage, coverImageAlt, dateFormatted } = details;
            try {
                const removeResult = await admin
                    .database()
                    .ref()
                    .child("posts")
                    .child(slug)
                    .remove();
                const updateResult = await admin
                    .database()
                    .ref()
                    .child("posts")
                    .child(details.slug)
                    .set({
                        title,
                        content,
                        coverImage,
                        coverImageAlt,
                        slug,
                        dateFormatted,
                    });

                return {
                    success: updateResult,
                    message: "Record successfully added",
                    ...details,
                };
            } catch (e) {
                throw new ApolloError(e);
            }
        },
        deletePost: async (_: void, { slug }: any) => {
            try {
                const result = await admin.database().ref().child("posts").child(slug).remove();

                return {
                    result: "Record successfully deleted",
                    slug,
                };
            } catch (e) {
                throw new ApolloError(e);
            }
        },
    },
};

export default resolvers;
