import fastify from 'fastify'
import userRoutes from '../api/v1/routes/userRoutes'
import loginRoutes from '../api/v1/routes/loginRoutes'

const fastifyApp = fastify()

const port = process.env.PORT_NODE ?? 8080;

fastifyApp.register(function (app, _, done) {
    userRoutes(app);
    done();
}, { prefix: "/api/v1/user" });

fastifyApp.register(function (app, _, done) {
    loginRoutes(app);
    done();
}, { prefix: "/api/v1/login" });

fastifyApp.listen({ port: port }).then(() => {
    console.log(`Api listening on port ${port}`);
})