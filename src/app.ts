import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import { fastifyAutoload } from '@fastify/autoload';
import helmet from '@fastify/helmet';
import fastifyView from '@fastify/view';
import handlebars from 'handlebars';
import path from 'path';
import minifier from 'html-minifier';

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
  layout: '../templates/layout.hbs',
  propertyName: 'renderFullPage',
});

app.register(fastifyView, {
  engine: { handlebars },
  root: './templates',
  propertyName: 'renderPartial',
  options: {
    useHtmlMinifier: minifier,
    htmlMinifierOptions: {
      removeComments: true,
      removeCommentsFromCDATA: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
    },
  },
});

app.register(helmet, { global: true });

app.register(fastifyAutoload, {
  dir: path.join(__dirname, 'routes'),
});

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
