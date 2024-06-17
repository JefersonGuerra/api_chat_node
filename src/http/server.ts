import fastify from 'fastify'
import userRoutes from '../api/v1/routes/userRoutes'

const app = fastify()

const port = process.env.PORT_NODE ?? 8080;

app.register(userRoutes, {prefix: "/api/v1/user"});

app.listen({ port: port }).then(() => {
    console.log(`Api listening on port ${port}`);
})