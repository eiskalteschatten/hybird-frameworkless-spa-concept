import { FastifyReply, FastifyRequest } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

import { FastifyInstanceWithView, PartialQuery } from '~/interfaces/fastify';

export interface RenderOptions {
  template: string;
  title?: string;
  req: FastifyRequest;
  pageData?: Record<string, any>;
}

export default fastifyPlugin(function(fastify: FastifyInstanceWithView, options: Record<string, any>, done: () => void): void {
  fastify.decorateReply('render', async function (renderOptions: RenderOptions): Promise<FastifyReply> {
    this.type('text/html');

    const { template, title, req, pageData } = renderOptions;
    const query = req.query as PartialQuery;

    if ('_partial' in query) {
      const html = await fastify.renderPartial(template, { ...pageData });
      return this.send({ html, title });
    }

    const html = await fastify.renderFullPage(template, { title, ...pageData });
    return this.send(html);
  });

  done();
});
