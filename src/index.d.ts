import { RenderOptions } from './lib/renderer';

declare module 'fastify' {
  interface FastifyReply {
    renderFullPage<T extends { [key: string]: any }>(page: string, data: T, opts?: RouteSpecificOptions): FastifyReply;
    renderFullPage(page: string, data?: object, opts?: RouteSpecificOptions): FastifyReply;
    renderPartial<T extends { [key: string]: any }>(page: string, data: T, opts?: RouteSpecificOptions): FastifyReply;
    renderPartial(page: string, data?: object, opts?: RouteSpecificOptions): FastifyReply;
    render(renderOptions: RenderOptions): Promise<FastifyReply>;
  }

  interface FastifyInstance {
    renderFullPage<T extends { [key: string]: any }>(page: string, data: T, opts?: RouteSpecificOptions): FastifyReply;
    renderFullPage(page: string, data?: object, opts?: RouteSpecificOptions): FastifyReply;
    renderPartial<T extends { [key: string]: any }>(page: string, data: T, opts?: RouteSpecificOptions): FastifyReply;
    renderPartial(page: string, data?: object, opts?: RouteSpecificOptions): FastifyReply;
    render(renderOptions: RenderOptions): Promise<FastifyReply>;
  }
}
