import LayoutBase from '../layout/LayoutBase';

import type { PageNotFoundComponent } from '@/themes/types';

/**
 * 404 页面
 * @param {*} props
 * @returns
 */
const PageNotFound: PageNotFoundComponent = (props) => {
  return <LayoutBase {...props}>404 Not found.</LayoutBase>;
};

export default PageNotFound;
