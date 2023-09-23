import styles from "./ItemList.module.css";
import { dummyData } from "../data/dummyData";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ItemList = () => {
  const numOfItemsInOnePage = useSelector(
    (state) => state.pagination.numOfItemsInOnePage
  );
  const currPageNum = useSelector((state) => state.pagination.currentPage);
  const dataLength = useSelector((state) => state.pagination.dataLength);

  return (
    <ul>
      {dummyData
        .slice(
          (currPageNum - 1) * numOfItemsInOnePage,
          currPageNum * numOfItemsInOnePage >= dataLength
            ? dataLength
            : currPageNum * numOfItemsInOnePage
        )
        .map(({ name, brand, price, sold_out, img_url, detail_page_url }) => (
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
        ))}
    </ul>
  );
};

export default ItemList;
