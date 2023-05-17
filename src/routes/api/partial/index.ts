import { FastifyRequest } from 'fastify';

import { FastifyInstanceWithView, FastifyReplyWithView } from '~/interfaces/fastify';

export default async (app: FastifyInstanceWithView) => {
  type Params = { path: string };
  // type RequestWithPath = FastifyRequest<{ Params: Params }>;
  app.get('/:path', async (req: FastifyRequest, reply: FastifyReplyWithView) => {
    // Cast here instead of using the RequestWithPath type above because Fastify's types are insanely buggy.
    const { path } = req.params as Params;
    const html = await app.renderPartial(`${path}.hbs`);
    reply.send(html);
  });
};
