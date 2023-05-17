import { FastifyRequest } from 'fastify';

import { FastifyInstanceWithView, FastifyReplyWithView, PartialQuery } from '~/interfaces/fastify';

export default async (app: FastifyInstanceWithView) => {
  app.get('/', async (req: FastifyRequest, reply: FastifyReplyWithView) => {
    const template = 'home.hbs';
    // Cast PartialQuery here instead of using a generic type with FasityRequest
    // because Fastify's types are buggy.
    const query = req.query as PartialQuery;

    if ('_partial' in query) {
      const html = await app.renderPartial(template);

      return reply.send({
        html,
      });
    }

    return reply.renderFullPage(template);
  });
};
