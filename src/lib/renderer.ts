import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

import {  PartialQuery } from '~/interfaces/fastify';

export interface RenderOptions extends Record<string, any> {
  title?: string;
}

export default fastifyPlugin(function(fastify: FastifyInstance, options: Record<string, any>, done: () => void): void {
  fastify.decorateReply('render', async function (template: string, req: FastifyRequest, renderOptions?: RenderOptions): Promise<FastifyReply> {
    const query = req.query as PartialQuery;

    const templateData = {
      ...renderOptions,
    };

    if (query && '_partial' in query) {
      const html = await fastify.renderPartial(template, templateData);
      return this.send({ html, title: renderOptions?.title });
    }

    this.type('text/html');
    return fastify.renderFullPage(template, templateData);
  });

  done();
});
