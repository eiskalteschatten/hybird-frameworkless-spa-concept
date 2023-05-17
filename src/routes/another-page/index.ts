import { FastifyRequest } from 'fastify';

import { FastifyInstanceWithView, FastifyReplyWithView } from '~/interfaces/fastify';

export default async (app: FastifyInstanceWithView) => {
  const template = 'anotherPAge.hbs';
  const title = 'Another Page';

  app.get('/', (req: FastifyRequest, reply: FastifyReplyWithView) => {
    reply.renderFullPage(template, {
      title,
    });
  });

  app.get('/_partial', async (req: FastifyRequest, reply: FastifyReplyWithView) => {
    const html = await app.renderPartial(template);

    reply.send({
      title,
      html,
    });
  });
};
