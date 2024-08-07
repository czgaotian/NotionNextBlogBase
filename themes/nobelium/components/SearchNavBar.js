import SearchInput from './SearchInput';
import Tags from './Tags';

/**
 * 搜索页面上方嵌入内容
 * @param {*} props
 * @returns
 */
export default function SearchNavBar(props) {
  return (
    <>
      <div className="pb-12">
        <SearchInput {...props} />
      </div>

      <Tags {...props} />
    </>
  );
}
