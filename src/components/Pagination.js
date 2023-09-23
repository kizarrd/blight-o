import { useEffect, useState } from "react";
import { dummyData } from "../data/dummyData";
import styles from "./Pagination.module.css";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../store/page-slice";

const Pagination = () => {
  const [pageIndices, setPageIndices] = useState([]);
  const maxPageNum = useSelector((state) => state.pagination.maxPageNum);
  const currPageNum = useSelector((state) => state.pagination.currentPageNum);
  const dataLength = useSelector((state) => state.pagination.dataLength);

  const dispatch = useDispatch();
  useEffect(() => {
    const newPageIndices = [];
    for (let i = 1; i < maxPageNum + 1; i++) {
      newPageIndices.push(i);
    }
    setPageIndices((prev) => newPageIndices);
  }, []);

  return (
    <div className={styles.pagination}>
      {pageIndices.map((idx) => (
        <button
          key={idx}
          className={
            styles["pagination-page"] +
            " " +
            (currPageNum === idx ? styles.selected : "")
          }
          onClick={() => {
            dispatch(pageActions.moveToThisPage({ pageNum: idx }));
            console.log(maxPageNum, currPageNum, dataLength);
          }}
        >
          {idx}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
