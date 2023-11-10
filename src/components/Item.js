import styles from "./Item.module.css";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const shopList = {
  slowsteadyclub: "슬로우스테디클럽",
  beslow: "비슬로우",
  havati: "하바티",
  sculpstore: "스컬프스토어",
  rhykershop: "라이커샵",
  EPP: "샵이피피(유니버셜리스트)",
  etcseoul: "ETC SEOUL",
  iamshop: "아이엠샵",
  obscura: "옵스큐라",
  randomwalk: "랜덤워크"
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

const Item = ({ data }) => {
  const {
    id,
    name,
    brand,
    original_price,
    sale_price,
    sale,
    sold_out,
    img_url,
    detail_page_url,
    _id,
    score
  } = data;

  return (
    <li className={styles["itemList-li"]}>
      <div className={styles.itemContainer}>
        {/* <a href={detail_page_url} target="_blank" rel="noreferrer"> */}
        <img
          className={styles.itemImg}
          src={"https://" + img_url}
          alt="item"
          // loading="lazy"
        />
        <div className={styles.description}>
          {/* <a href={detail_page_url} target="_blank" rel="noreferrer"> */}
          <span className={styles.brand}>[{brand}] </span>
          <span className={styles.item_name}>{name}</span>
          {/* <span style={{paddingLeft: '10px', color: 'blue', fontWeight: 'bold', fontSize: '16px'}}>{Math.round(score*100)/100}</span> */}
        </div>
        <div className={styles.other_info}>
          <div className={styles.price}>
            {sale === "True" ? (
              <>
                <div>
                  <s className={styles.price__original}>
                    {formatPrice(original_price)}원
                  </s>
                </div>
                <div>
                  <span className={styles.price__sale}>
                    {formatPrice(sale_price)}원
                  </span>
                  <span className={styles.price__percentage}>
                    {Math.round(((original_price - sale_price) / original_price) * 100)}%
                  </span>
                </div>
              </>
            ) : (
              <span className={styles.price_wo_sale}>
                {formatPrice(original_price)}원
              </span>
            )}
            {sold_out === "True" && (
              <div className={styles.sold_out}>품절</div>
            )}
          </div>
          <div className={styles.go_to_website}>
            <a href={detail_page_url} target="_blank" rel="noreferrer">
              <button className={styles.go_to_website__button}>
                확인하러 가기{" "}
                <OpenInNewIcon
                  fontSize="small"
                  className={styles.button_icon}
                />
              </button>
            </a>
            <div className={styles.website_info}>
              판매처: {getShopName(id, "kor")}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Item;
