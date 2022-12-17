import { Pagination } from './pagination';
import { IPaginationMeta } from './pagination-option.interface';

interface PaginationOptions<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  route: string;
}

/**
 * @description Creates a pagination object
 * @param {T[]} data - The array of items to paginate.
 * @param {number} total - The total number of items.
 * @param {number} page - The current page.
 * @param {number} per_page - The number of items per page.
 * @param {string} route - The route for generating links (i.e., WITHOUT query params).
 * @returns {Pagination<T>} - The pagination object.
 * @example
 * // returns a pagination object
 * const pagination = createPagination({ data: [], total: 0, page: 1, per_page: 10, route: '/users' });
 */
export function PaginationObject<T>({
  data,
  total,
  page = 1,
  per_page = 10,
  route = '/',
}: PaginationOptions<T>): Pagination<T> {
  const totalPages = Math.ceil(total / per_page);

  const hasFirstPage = route;
  const hasPreviousPage = route && page > 1;
  const hasNextPage = route && page < totalPages;
  const hasLastPage = route && totalPages > 0;

  const symbol = route && new RegExp(/\?/).test(route) ? '&' : '?';

  const routes = {
    first: hasFirstPage ? `${route}${symbol}per_page=${per_page}` : '',
    previous: hasPreviousPage
      ? `${route}${symbol}page=${+page - 1}&per_page=${per_page}`
      : '',
    next: hasNextPage
      ? `${route}${symbol}page=${+page + 1}&per_page=${per_page}`
      : '',
    last: hasLastPage
      ? `${route}${symbol}page=${totalPages}&per_page=${per_page}`
      : '',
  };

  const meta: IPaginationMeta = {
    total,
    current_page: Number(page),
    per_page: Number(per_page),
    total_pages: totalPages,
    first: routes.first,
    previous: routes.previous,
    next: routes.next,
    last: routes.last,
  };

  return new Pagination(meta, data);
}
