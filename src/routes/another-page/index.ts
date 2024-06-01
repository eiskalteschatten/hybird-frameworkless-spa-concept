import { FastifyReply, FastifyRequest } from 'fastify';

import { FastifyInstanceWithView } from '~/interfaces/fastify';

export default async (app: FastifyInstanceWithView) => {
  app.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
    return reply.render({
      template: 'anotherPage.hbs',
      title: 'Another Page',
      req,
    });
  });
};
