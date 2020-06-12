
// eslint-disable-next-line no-unused-vars
import { IRoute } from './routes';

/**
 *
 * @param {IRoute} route
 */
export function validateRoute(route) {
  if (route.path == null) {
    throw new Error('你传递了一个没有 path 的 route 对象\n' + JSON.stringify(route));
  }
}
