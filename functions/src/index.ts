import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
// Construct a schema, using GraphQL schema language

admin.initializeApp({
    databaseURL: "https://mutual-fund-blog.firebaseio.com/",
    credential: admin.credential.cert({
        projectId: "mutual-fund-blog",
        privateKey:
            "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCuUpkps7rQ9e6g\nsZ9Wbg+Qksewp8kG2bNgm++X8fKSpPsWOwQ7Rg49/4jz8lTjqp3Ms6J8Fmtzsdu3\nwyrbFHg8iMZanzXo8JavNDoFJg0dkvPLGwUibX8Xrfg5hsfIb+9z+AZGH//WqOT9\nYWfAuRssdwlfjejx0hWE5zOkg1Blj2cYRrfxSj7kVBbmTV4S2kc6pymCyRBISmM2\n21XcCWgtNIHj4Y5AAGZgE2sM7Fv4q8Oexra464imw/F24AT7udxjwzQKheWu5VS9\nIHoWNKw2XOKe2gxdIDg+erS0/silt9hoOSsSmmJVykCk78jh2oN4W13gPELJ8G/O\n6V0UP7ihAgMBAAECggEABcjXIlrU0PS2OfYcRCnpDDpjVA2km7H16YznHjmbZmnB\nLLd24EYmoxXzjBUZ+MeLZAoVHa0V8farDzMeXRB18xvz9A4gLnYsU+JFvMXAAz/C\nUAEvUjlZXCvBUXGzN7JyMFJAwrXdX24cPNBig7Lzb5jAHSqoT2ecn/FBmxIMmmAX\nNmqS+oH3Xn0mZKqSH/HPUZQJGFagoTBAqkUVny1p6kGd9bjXQErKDGIiGqTDAp99\nJTJaso1m2C3mnP+UNoNtUH/MPdVUUgXg/9OfpYjmQ/uroWkG/Z8cVe4ygRdRFZUI\nQU+GfLxYfwZwIvGZXgad3ZrZhbw31NyvN3YRKJ9ziQKBgQDydH9/w/ypCWbJ3c7d\nChFCp89M1tHjqIgl8h4W1D10HuQq20K7Dr6MxaUM/m88D/0InVWcVr/cYTCnecO+\nz9KWUNycHvtZWChCLdOR9CUmF+0PL5pnXeF8ReP7YffRzFNva3c0S8pE7v9nyR7x\nj2lZfqGbgn6eP6uaIEvOcudCOQKBgQC4D7IfCigGDfR7Fkf0/5dkyntL5Q57KvaM\nIt8DqRWW0FtKqHMToHSrJgRiaLICrz3fQ9+aSLtoW/OxtY4e6W5KcWUFw5PogQjK\nkj+c4OniBUXF27JF8pfgI79tZbTXSJTu/MELyGq5NI36bUL8KZxiPh0J2sCctRiq\nt8dY5kkJqQKBgD1fCcsAhBsRmygr8in3W2kg6xNLKTPUPCpGwCENNkUHcL/8YkbR\nM6CUgvPoD6YHcghVMw9w0f3pyBQMeWT6XBbafw0xtnPmIcKmsPA3+ZNL6SC37wCN\nPf9j/ZJrOPytGM2SSUk+igOq75GI0kFZCNSzfhrMDFroSPqphCbM5QbZAoGBAI/X\nNEwtk7mnjjfi4bkFRTrvQgu9peN7X9GELuSdbtG9YpqlqcjczFA0FZkSWIrgiGnC\nkSvxSwPzWC64w6hEpHxowZoPjbdVn5kvUac33Y9Ur4JAfsFLJIV1alQD95+GiV17\nCSI8Lasu9wWN/ZsyqZPdFrRsz7mnjO9dT9yZmtqBAoGBAPG4G5ra/+TBaX3meXr5\n5MDKnkN7uUE0d7JtCTXQy8MkoE2y64k8lxRFMG/eSuqH8BZfhfGElA/oTbdD+kJ1\n+BQzlI1HgQ9LU5fC1wU4+fcEX26/vW3vSumXqRz66K9v0BwZrAM3MdHxxHA5UqZ8\nVeDl2Zcgk3YAeZ3rfXZjn9kk\n-----END PRIVATE KEY-----\n",
        clientEmail: "firebase-adminsdk-n2fg1@mutual-fund-blog.iam.gserviceaccount.com",
    }),
});
const typeDefs = gql`
    type Blog {
        content: String
        coverImage: String
        coverImageAlt: String
        dateFormatted: String
        slug: String
        title: String
    }
    type Query {
        posts(slug: String): [Blog]
    }
`;

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        posts: (_: any, args: any) => {
            let db = admin.database().ref("posts");
            console.log(args.slug);
            if (args.slug) {
                return db
                    .once("value")
                    .then((snap) => snap.val())
                    .then((val) =>
                        Object.keys(val)
                            .filter((key) => args.slug === key)
                            .map((key) => val[key])
                    );
            } else {
                return db
                    .once("value")
                    .then((snap) => snap.val())
                    .then((val) => Object.keys(val).map((key) => val[key]));
            }
        },
    },
};

// setup express cloud function
const app = express();

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: "/", cors: true });

export const helloWorld = functions.https.onRequest(app);
