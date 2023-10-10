import { useSearchParams } from "react-router-dom";
import styles from "./ItemList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { searchActions } from "../store/search-slice";
import Pagination from "./Pagination";

const ItemList = () => {
  const itemListDataBySearch = useSelector(
    (state) => state.search.searchAndPageResult
  );
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    let keyword = searchParams.get("search");
    let page = searchParams.get("page");
    if (keyword && keyword !== 'null') {
      console.log(typeof(keyword))
      dispatch(searchActions.search({ keyword }));
      dispatch(searchActions.moveToThisPage({ page: page ? Number(page) : 1 }));
    } else {
      dispatch(searchActions.reset());
      dispatch(searchActions.moveToThisPage({ page: page ? Number(page) : 1 }));
    }
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

  return (
    <>
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
            <li key={id}>
              <div className={styles.itemContainer}>
                <a href={detail_page_url} target="_blank" rel="noreferrer">
                  <img
                    className={styles.itemImg}
                    src={"https://" + img_url}
                    alt="item"
                    // loading="lazy"
                  />
                  <div>[{brand}]</div>
                  <div>{name}</div>

                  {sale === "True" ? (
                    <div>
                      <s style={{ opacity: "0.5" }}>{original_price}</s>
                      <span style={{ marginLeft: "5px" }}>{sale_price}</span>
                      <span style={{ marginLeft: "5px", color: "red" }}>
                        {((original_price - sale_price) / original_price) * 100}
                        %
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span>{original_price}</span>
                    </div>
                  )}

                  <div>판매처: {getShopName(id)}</div>
                </a>
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
