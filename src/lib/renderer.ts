import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

import {  PartialQuery } from '~/interfaces/fastify';

export interface RenderOptions {
  title?: string;
  req: FastifyRequest;
  pageData?: Record<string, any>;
}

export default fastifyPlugin(function(fastify: FastifyInstance, options: Record<string, any>, done: () => void): void {
  fastify.decorateReply('render', async function (template: string, renderOptions: RenderOptions): Promise<FastifyReply> {
    this.type('text/html');

    const { title, req, pageData } = renderOptions;
    const query = req.query as PartialQuery;

    if ('_partial' in query) {
      const html = await fastify.renderPartial(template, { ...pageData });
      return this.send({ html, title });
    }

    return fastify.renderFullPage(template, { title, ...pageData });
  });

  done();
});
