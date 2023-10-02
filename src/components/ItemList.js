import { useSearchParams } from "react-router-dom";
import styles from "./ItemList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { searchActions } from "../store/search-slice";
import Pagination from "./Pagination";

const ItemList = () => {
  const itemListDataBySearch = useSelector(
    (state) => state.search.searchResult
  );
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.get("search")) {
      dispatch(searchActions.search({ keyword: searchParams.get("search") }));
    }
  }, [dispatch, searchParams]);

  return (
    <>
      <ul>
        {itemListDataBySearch.map(
          ({ name, brand, price, sold_out, img_url, detail_page_url }) => (
            <li>
              <div className={styles.itemContainer}>
                <img
                  className={styles.itemImg}
                  src={"https://" + img_url}
                  alt="item"
                  loading="lazy"
                />
                <div>{name}</div>
                <div>{price}</div>
              </div>
            </li>
          )
        )}
      </ul>
      <Pagination />
    </>
  );
};

export default ItemList;
