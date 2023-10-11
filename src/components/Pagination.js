import styles from "./Pagination.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Pagination = () => {
  // const [pageIndices, setPageIndices] = useState([]);
  const searchResult = useSelector((state) => state.search.searchResult);
  const numOfItemsInOnePage = useSelector(
    (state) => state.search.numOfItemsInOnePage
  );
  const maxPageNum = Math.ceil(searchResult.length / numOfItemsInOnePage);
  let [searchParams, setSearchParams] = useSearchParams();
  const currPageNum = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const MAX_NUM_OF_PAGES = 10;
  const firstOutOfTen =
    currPageNum % 10
      ? MAX_NUM_OF_PAGES * Math.floor(currPageNum / MAX_NUM_OF_PAGES) + 1
      : MAX_NUM_OF_PAGES * (Math.floor(currPageNum / MAX_NUM_OF_PAGES) - 1) + 1;
  const lastOutOfTen =
    currPageNum % MAX_NUM_OF_PAGES
      ? MAX_NUM_OF_PAGES * Math.floor(currPageNum / MAX_NUM_OF_PAGES) +
        MAX_NUM_OF_PAGES
      : MAX_NUM_OF_PAGES * (Math.floor(currPageNum / MAX_NUM_OF_PAGES) - 1) +
        MAX_NUM_OF_PAGES;

  return (
    <div className={styles.pagination}>
      <button
        className={styles.movePageBtn}
        onClick={() => {
          if (currPageNum === 1) {
            alert("첫번째 페이지 입니다!");
            return;
          }
          window.scrollTo(0, 0);
          const newSearchParams = searchParams.get("search")
            ? { search: searchParams.get("search"), page: 1 }
            : { page: 1 };
          setSearchParams(newSearchParams);
        }}
      >
        {"<<"}
      </button>
      <button
        className={styles.movePageBtn}
        onClick={() => {
          if (currPageNum === 1) {
            alert("첫번째 페이지 입니다!");
            return;
          }
          window.scrollTo(0, 0);
          const newSearchParams = searchParams.get("search")
            ? { search: searchParams.get("search"), page: currPageNum - 1 }
            : { page: currPageNum - 1 };
          setSearchParams(newSearchParams);
        }}
      >
        {"<"}
      </button>
      {(() => {
        const newPageIndices = [];
        for (
          let i = firstOutOfTen;
          i < (lastOutOfTen <= maxPageNum ? lastOutOfTen : maxPageNum) + 1;
          i++
        ) {
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
                const newSearchParams = searchParams.get("search")
                  ? { search: searchParams.get("search"), page: i }
                  : { page: i };
                setSearchParams(newSearchParams);
              }}
            >
              {i}
            </button>
          );
        }
        return newPageIndices;
      })()}
      <button
        className={styles.movePageBtn}
        onClick={() => {
          if (currPageNum === maxPageNum) {
            alert("마지막 페이지 입니다!");
            return;
          }
          window.scrollTo(0, 0);
          const newSearchParams = searchParams.get("search")
            ? { search: searchParams.get("search"), page: currPageNum + 1 }
            : { page: currPageNum + 1 };
          setSearchParams(newSearchParams);
        }}
      >
        {">"}
      </button>
      <button
        className={styles.movePageBtn}
        onClick={() => {
          if (currPageNum === maxPageNum) {
            alert("마지막 페이지 입니다!");
            return;
          }
          window.scrollTo(0, 0);
          const newSearchParams = searchParams.get("search")
            ? { search: searchParams.get("search"), page: maxPageNum }
            : { page: maxPageNum };
          setSearchParams(newSearchParams);
        }}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
