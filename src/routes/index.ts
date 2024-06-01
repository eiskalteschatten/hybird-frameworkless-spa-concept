import { FastifyReply, FastifyRequest } from 'fastify';

import { FastifyInstanceWithView } from '~/interfaces/fastify';

export default async (app: FastifyInstanceWithView) => {
  app.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
    return reply.render({
      template: 'home.hbs',
      req,
    });
  });
};
