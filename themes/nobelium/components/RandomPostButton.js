import BLOG from '@/blog.config';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

/**
 * 随机跳转到一个文章
 */
export default function RandomPostButton(props) {
  const { latestPosts } = props;
  const router = useRouter();
  const { t } = useTranslation('menu');
  /**
   * 随机跳转文章
   */
  function handleClick() {
    const randomIndex = Math.floor(Math.random() * latestPosts.length);
    const randomPost = latestPosts[randomIndex];
    router.push(`${BLOG.SUB_PATH}/${randomPost?.slug}`);
  }

  return (
    <div
      title={t('walk-around')}
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-black hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-10"
      onClick={handleClick}
    >
      <i className="fa-solid fa-podcast"></i>
    </div>
  );
}
