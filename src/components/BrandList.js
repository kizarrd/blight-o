import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./BrandList.module.css";

const BrandList = () => {
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    (async () => {
      const brandsData = await (
        await fetch(`${process.env.REACT_APP_API_BASE}/items/brands`)
      ).json();
      console.log(brandsData);
      setBrands((brands) => brandsData.slice(1));
    })();
  }, []);

  return (
    <>
    <p className={styles.guide}>*ctrl+f 를 통해 브랜드 검색을 하실 수 있습니다.</p>
    <ul className={styles.brand_ul}>
      {brands.map((brandName) => (
        <li className={styles.brand_li}>
          <Link className={styles.brand_link} to={`/items?search=${brandName}`}>{brandName}</Link>
        </li>
      ))}
    </ul>
    </>
  );
};

export default BrandList;
