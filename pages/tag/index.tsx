import { getGlobalData } from '@/lib/notion/getNotionData';
import BLOG from '@/blog.config';
import { useRouter } from 'next/router';
import { getLayoutByTheme } from '@/theme';
import { useTranslation } from 'next-i18next';
import { omit } from 'lodash';

import type { FC } from 'react';
import type {
  PageMeta,
  TagIndexProps,
  ThemeTagIndexProps,
} from '@/pages/types';
import type { GetStaticProps } from 'next';

/**
 * 标签首页
 * @param {*} props
 * @returns
 */
const TagIndex: FC<TagIndexProps> = (props) => {
  const { siteInfo } = props;
  const { t } = useTranslation('common');

  // 根据页面路径加载不同Layout文件
  const Layout = getLayoutByTheme(useRouter()) as FC<ThemeTagIndexProps>;

  const pageMeta: PageMeta = {
    title: `${t('tags')} | ${siteInfo?.title}`,
    description: siteInfo?.description,
    image: siteInfo?.pageCover,
    slug: 'tag',
    type: 'website',
  };

  return <Layout {...props} pageMeta={pageMeta} />;
};

export const getStaticProps: GetStaticProps<TagIndexProps> = async () => {
  const props = await getGlobalData('tag-index-props');
  return {
    props: omit(props, 'allPages'),
    revalidate: BLOG.NEXT_REVALIDATE_SECOND,
  };
};

export default TagIndex;
