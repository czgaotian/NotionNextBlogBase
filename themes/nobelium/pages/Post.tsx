import LayoutBase from '../layout/LayoutBase';
import ArticleLock from '../components/ArticleLock';
import ArticleInfo from '../components/ArticleInfo';
import ArticleFooter from '../components/ArticleFooter';
// TODO: move to theme file
import NotionPage from '@/components/NotionPage';
import ShareBar from '@/components/ShareBar';
import Comment from '@/components/Comment';
import { ContextWrapper } from '../providers';
import { useSiteStore } from '@/providers/siteProvider';
import { useShallow } from 'zustand/react/shallow';

import type { FC } from 'react';

const Post: FC = () => {
  const { post, isLock } = useSiteStore(
    useShallow((state) => ({
      post: state.post,
      isLock: state.isLock,
    })),
  );

  return (
    <LayoutBase>
      {isLock && <ArticleLock />}

      {!isLock && (
        <div id="article-wrapper" className="px-2">
          {post && <ArticleInfo />}
          {post && <NotionPage post={post} />}
          <ShareBar post={post} />
          <Comment frontMatter={post} />
          <ArticleFooter />
        </div>
      )}
    </LayoutBase>
  );
};

export default ContextWrapper(Post);
