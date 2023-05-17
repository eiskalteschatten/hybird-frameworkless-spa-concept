import { FastifyRequest } from 'fastify';

import { FastifyInstanceWithView, FastifyReplyWithView } from '~/interfaces/fastify';

export default async (app: FastifyInstanceWithView) => {
  app.get('/', (req: FastifyRequest, reply: FastifyReplyWithView) => {
    reply.renderFullPage('anotherPage.hbs');
  });

  app.get('/_partial', async (req: FastifyRequest, reply: FastifyReplyWithView) => {
    const html = await app.renderPartial('anotherPage.hbs');

    reply.send({
      title: 'Another Page',
      html,
    });
  });
};
