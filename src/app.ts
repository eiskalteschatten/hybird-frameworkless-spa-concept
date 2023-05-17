import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import helmet from '@fastify/helmet';
import fastifyView from '@fastify/view';
import handlebars from 'handlebars';
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

app.register(fastifyView, {
  engine: { handlebars },
  root: './templates',
  layout: 'layout.hbs',
  propertyName: 'fullPage',
});

app.register(fastifyView, {
  engine: { handlebars },
  root: './templates',
  propertyName: 'partial',
});

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
