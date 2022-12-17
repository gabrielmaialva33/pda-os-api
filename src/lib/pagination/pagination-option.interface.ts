export interface IPaginationOptions {
  /**
   * the page that is requested
   */
  page: number | string;
  /**
   * the amount of items to be requested per page
   */
  per_page: number | string;
  /**
   * sort by field
   */
  sort?: string;
  /**
   * sort order
   */
  order?: 'asc' | 'desc' | 'ASC' | 'DESC';
  /**
   * a route for generating links (i.e., WITHOUT query params)
   */
  route?: string;
}

export interface IPaginationMeta {
  /**
   * the amount of items on this specific page
   */
  total: number;
  /**
   * the total amount of items
   */
  per_page: number;
  /**
   * the current page this paginator "points" to
   */
  current_page: number;
  /**
   * the total amount of pages in this paginator
   */
  total_pages: number;
  /**
   * a link to the "first" page
   */
  first?: string;
  /**
   * a link to the "previous" page
   */
  previous?: string;
  /**
   * a link to the "next" page
   */
  next?: string;
  /**
   * a link to the "last" page
   */
  last?: string;
}
