import fastify from 'fastify'
import userRoutes from '../api/v1/routes/userRoutes'
import loginRoutes from '../api/v1/routes/loginRoutes'
import contactRequestRoute from '../api/v1/routes/contactRequestRoute'
import listContactRoute from '../api/v1/routes/listContactRoute'
import messageRoute from '../api/v1/routes/messageRoute'
import cors from '@fastify/cors'

const fastifyApp = fastify()

fastifyApp.register(cors, {
    origin: "*",
})

const port = process.env.PORT_NODE ?? 8080;
const hostname = process.env.HOST_NODE;

fastifyApp.register(function (app, _, done) {
    userRoutes(app);
    done();
}, { prefix: "/api/v1/user" });

fastifyApp.register(function (app, _, done) {
    loginRoutes(app);
    done();
}, { prefix: "/api/v1/login" });

fastifyApp.register(function (app, _, done) {
    contactRequestRoute(app);
    done();
}, { prefix: "/api/v1/contactRequest" });

fastifyApp.register(function (app, _, done) {
    listContactRoute(app);
    done();
}, { prefix: "/api/v1/listContact" });

fastifyApp.register(function (app, _, done) {
    messageRoute(app);
    done();
}, { prefix: "/api/v1/message" });

fastifyApp.listen({ port: port, host: hostname }).then(() => {
    console.log(`Api listening on port ${port}`);
})