import Announcement from '../components/Announcement';
import PostList from './PostList';

import type { HomeComponent } from '@/themes/types';

/**
 * 首页
 * 首页是个博客列表，加上顶部嵌入一个公告
 * @param {*} props
 * @returns
 */

const Home: HomeComponent = (props) => {
  return <PostList {...props} topSlot={<Announcement {...props} />} />;
};

export default Home;
