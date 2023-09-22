import styles from './ItemList.module.css';
import { dummyData } from "../data/dummyData";

const ItemList = () => {
  return (
    <ul>
      {dummyData.map(
        ({ name, brand, price, sold_out, img_url, detail_page_url }) => (
          <li>
            <img className={styles.itemImg} src={'https://'+img_url} alt="item" />
            <div>{name}</div>
            <div>{price}</div>
          </li>
        )
      )}
    </ul>
  );
};

export default ItemList;
