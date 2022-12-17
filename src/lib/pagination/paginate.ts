import { Logger } from '@nestjs/common';

import { PaginationObject } from './create-pagination';
import { Pagination } from './pagination';
import { IPaginationOptions } from './pagination-option.interface';

const DEFAULT_PER_PAGE = 10;
const DEFAULT_PAGE = 1;

const Log = new Logger(Pagination.name);

/**
 * It takes an array of items, and returns a pagination object with the items sliced to the current
 * page, the total number of items, the current page, the number of items per page, and the route
 * @param {T[]} data - The array of items to paginate.
 * @param {IPaginationOptions} options - IPaginationOptions
 * @returns A function that takes in an array of items and an options object and returns a promise that
 * resolves to a pagination object.
 */
export async function paginate<T>(
  data: T[],
  options: IPaginationOptions,
): Promise<Pagination<T>> {
  const [page, per_page, route] = resolveOptions(options);

  if (page < 1)
    return PaginationObject({
      data: [],
      total: 0,
      page: 1,
      per_page,
      route,
    });

  return PaginationObject<T>({
    data,
    total: data.length,
    page,
    per_page,
    route,
  });
}

function resolveOptions(options: IPaginationOptions): [number, number, string] {
  const page = resolveNumericOption(options, 'page', DEFAULT_PAGE);
  const per_page = resolveNumericOption(options, 'per_page', DEFAULT_PER_PAGE);
  const route = options.route;

  return [page, per_page, route];
}

function resolveNumericOption(
  options: IPaginationOptions,
  key: 'page' | 'per_page',
  defaultValue: number,
): number {
  const value = options[key];
  const resolvedValue = Number(value);

  if (Number.isInteger(resolvedValue) && resolvedValue >= 0)
    return resolvedValue;

  Log.warn(
    `Query parameter "${key}" with value "${value}" was resolved as "${resolvedValue}", please validate your query input! Falling back to default "${defaultValue}".`,
  );

  return defaultValue;
}
