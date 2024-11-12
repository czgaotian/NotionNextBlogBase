import BLOG from '@/blog.config';
import { getPostBlocks } from '@/lib/notion';
import { getGlobalData } from '@/lib/notion/getNotionData';
import { useLayout } from '@/theme';
import { omit } from 'lodash';

import type { GetStaticProps, GetStaticPaths } from 'next';
import type { PageMeta, PageIndexProps, ThemePageIndexProps } from '../types';
import type { FC } from 'react';
import type { ParsedUrlQuery } from 'querystring';

export interface PageParams extends ParsedUrlQuery {
  page: string;
}

/**
 * 文章列表分页
 * @param {*} props
 * @returns
 */
const Page: FC<PageIndexProps> = (props) => {
  const { siteInfo } = props;

  // 根据页面路径加载不同Layout文件
  const PostList = useLayout() as FC<ThemePageIndexProps>;
  const pageMeta: PageMeta = {
    title: `${props?.page} | Page | ${siteInfo?.title}`,
    description: siteInfo?.description,
    image: siteInfo?.pageCover,
    slug: 'page/' + props.page,
    type: 'website',
  };

  return <PostList pageMeta={pageMeta} {...props} />;
};

export const getStaticPaths: GetStaticPaths<PageParams> = async () => {
  const from = 'page-paths';
  const { postCount } = await getGlobalData(from);
  const totalPages = Math.ceil(postCount / BLOG.POSTS_PER_PAGE);
  return {
    // remove first page, we 're not gonna handle that.
    paths: Array.from({ length: totalPages - 1 }, (_, i) => ({
      params: { page: '' + (i + 2) },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<
  PageIndexProps,
  PageParams
> = async (context) => {
  const { page } = context.params as PageParams;
  const pageNumber = parseInt(page, 10);
  const props = await getGlobalData(`page-${pageNumber}`);
  const { allPages } = props;
  const allPosts = allPages?.filter(
    (page) => page.type === 'Post' && page.status === 'Published',
  );
  // 处理分页
  const posts = allPosts.slice(
    BLOG.POSTS_PER_PAGE * (pageNumber - 1),
    BLOG.POSTS_PER_PAGE * pageNumber,
  );

  // 处理预览
  if (BLOG.POST_LIST_PREVIEW === 'true') {
    await Promise.all(
      posts.map(async (post) => {
        if (!post.password) {
          post.blockMap = await getPostBlocks(
            post.id,
            'slug',
            BLOG.POST_PREVIEW_LINES,
          );
        }
      }),
    );
  }

  omit(props, 'allPages');
  return {
    props: {
      ...props,
      posts,
      page: pageNumber,
    },
    revalidate: BLOG.NEXT_REVALIDATE_SECOND,
  };
};

export default Page;
