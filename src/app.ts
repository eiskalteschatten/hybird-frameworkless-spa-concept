import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import helmet from '@fastify/helmet';
// import fastifyView from '@fastify/view';
// import ejs from 'ejs';
import path from 'path';

const port = Number(process.env.PORT) || 4000;

const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
  ignoreTrailingSlash: true,
});

// app.register(fastifyView, {
//   engine: { ejs },
//   root: './templates/blog',
//   layout: 'layout.ejs',
//   propertyName: 'blog',
// });

app.register(helmet, { global: true });

app.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'public'),
});

// TODO!
// app.setNotFoundHandler((req, res) => {
//   res.sendFile('index.html');
// });

const host = process.env.RUNNING_IN_DOCKER === 'true' ? '0.0.0.0' : undefined;

app.listen({ port, host }, error => {
  if (error) {
    throw error;
  }
});

export default app;
