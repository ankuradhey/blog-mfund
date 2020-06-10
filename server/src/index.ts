import { ApolloServer } from "apollo-server";
import typeDefs from "./schema";
import resolvers from "./resolver";

// Set up Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
});

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== "test") {
    server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
        console.log(`🚀 app running at ${url}`);
    });
}
