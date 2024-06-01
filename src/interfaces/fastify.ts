import { FastifyInstance } from 'fastify';

// Copied from node_modules/@fastify/types/index.d.ts
interface RouteSpecificOptions {
  layout?: string;
}

// Temporary workaround for https://github.com/fastify/point-of-view/issues/301

// Temporary workaround for https://github.com/fastify/point-of-view/issues/301
export interface FastifyInstanceWithView extends FastifyInstance {
  view: never;
  renderFullPage<T extends { [key: string]: any }>(page: string, data: T, opts?: RouteSpecificOptions): Promise<string>;
  renderFullPage(page: string, data?: object, opts?: RouteSpecificOptions): Promise<string>;
  renderPartial<T extends { [key: string]: any }>(page: string, data: T, opts?: RouteSpecificOptions): Promise<string>;
  renderPartial(page: string, data?: object, opts?: RouteSpecificOptions): Promise<string>;
}

export interface PartialQuery {
  _partial?: boolean;
}
