import styles from "./ItemList.module.css";
import { useSelector } from "react-redux";

const ItemList = ({itemListData}) => {

  return (
    <ul>
      {itemListData
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
