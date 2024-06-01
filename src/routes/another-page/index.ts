import { FastifyRequest } from 'fastify';

import { FastifyInstanceWithView, FastifyReplyWithView } from '~/interfaces/fastify';

export default async (app: FastifyInstanceWithView) => {
  app.get('/', async (req: FastifyRequest, reply: FastifyReplyWithView) => {
    return reply.render({
      template: 'anotherPage.hbs',
      title: 'Another Page',
      req,
    });
  });
};
