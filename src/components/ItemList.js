import { json, useLoaderData, useSearchParams } from "react-router-dom";
import styles from "./ItemList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { searchActions } from "../store/search-slice";
import Pagination from "./Pagination";
import Search from "./Search";

const ItemList = () => {
  const itemListDataBySearch = useSelector(
    (state) => state.search.searchAndPageResult
  );
  const loadedData = useLoaderData();
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    let page = searchParams.get("page");
    dispatch(searchActions.load({ fetchedData: loadedData }));
    dispatch(searchActions.moveToThisPage({ page: page ? Number(page) : 1 }));
  }, [dispatch, searchParams]);

  const shopList = {
    slowsteadyclub: "슬로우스테디클럽",
    beslow: "비슬로우",
    havati: "하바티",
    sculpstore: "스컬프스토어",
    rhykershop: "라이커샵",
  };

  const getShopName = (itemId, lang = "eng") => {
    for (const shop of Object.keys(shopList)) {
      if (itemId.includes(shop)) {
        if (lang === "kor") return shopList[shop];
        else if (lang === "eng") return shop;
      }
    }
  };

  const formatPrice = (priceValue) => {
    return new Intl.NumberFormat().format(priceValue);
  };

  return (
    <>
      <Search />
      <ul>
        {itemListDataBySearch.map(
          ({
            id,
            name,
            brand,
            original_price,
            sale_price,
            sale,
            sold_out,
            img_url,
            detail_page_url,
          }) => (
            <li className={styles["itemList-li"]} key={id}>
              <div className={styles.itemContainer}>
                <a href={detail_page_url} target="_blank" rel="noreferrer">
                  <img
                    className={styles.itemImg}
                    src={"https://" + img_url}
                    alt="item"
                    // loading="lazy"
                  />
                </a>
                <div className={styles.description}>
                  <a href={detail_page_url} target="_blank" rel="noreferrer">
                    <span className={styles.brand}>[{brand}] </span>
                    <span className={styles.item_name}>{name}</span>
                  </a>
                </div>
                {sale === "True" ? (
                  <div className={styles.price}>
                    <s className={styles.price__original}>{formatPrice(original_price)}원</s>
                    <span className={styles.price__sale}>{formatPrice(sale_price)}원</span>
                    <span className={styles.price__percentage}>
                      {((original_price - sale_price) / original_price) * 100}%
                    </span>
                  </div>
                ) : (
                  <div className={styles.price}>
                    <span className={styles.price_wo_sale}>
                      {formatPrice(original_price)}원
                    </span>
                  </div>
                )}

                <div>판매처: {getShopName(id)}</div>
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

export const loader = async ({ request, params }) => {
  // loader is not a react component. so hooks like useSearchParams cannot be used here 
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("search"); 
  // console.log(searchTerm);
  let API_URL = "http://localhost:8080/items" + (searchTerm === null ? "" : `/search?keyword=${searchTerm}`);
  const response = await fetch(API_URL);
  // console.log(response);
  if (!response.ok) {
    throw json(
      { message: "Could not fetch items" },
      { status: 500 }
    );
  } else {
    return response;
  }
};
