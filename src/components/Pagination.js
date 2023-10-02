import styles from "./Pagination.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Pagination = () => {
  // const [pageIndices, setPageIndices] = useState([]);
  const searchResult = useSelector((state) => state.search.searchResult);
  const numOfItemsInOnePage = useSelector((state) => state.search.numOfItemsInOnePage);
  const maxPageNum = Math.ceil(searchResult.length / numOfItemsInOnePage);
  let [searchParams, setSearchParams] = useSearchParams();
  const currPageNum = Number(searchParams.get('page'));

  return (
    <div className={styles.pagination}>
      {(() => {
        const newPageIndices = [];
        for (let i = 1; i < maxPageNum + 1; i++) {
          newPageIndices.push(
            <button
              key={i}
              className={
                styles["pagination-page"] +
                " " +
                (currPageNum === i ? styles.selected : "")
              }
              onClick={() => {
                // console.log(searchParams.get('search'));
                window.scrollTo(0, 0);
                setSearchParams({ search: searchParams.get('search'), page: i })
              }}
            >
              {i}
            </button>
          );
        }
        return newPageIndices;
      })()}
    </div>
  );
};

export default Pagination;
