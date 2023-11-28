import classes from "./Item.module.css";
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
  randomwalk: "랜덤워크",
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
    // _id,
    // score,
  } = data;

  const recordClickPurchaseButton = async () => {
    let API_URL = `${process.env.REACT_APP_API_BASE}/clickData/add-click-record?itemName=${name}`;
    // const response = await (
      await fetch(API_URL, {
        method: "POST", 
        mode: "cors",
      })
    // ).json();
    // console.log(response);
  };

  return (
    <li className={classes["itemList-li"]}>
      <div className={classes.itemContainer}>
        {/* <a href={detail_page_url} target="_blank" rel="noreferrer"> */}
        <div className={classes.thumbnail}>
          <img
            className={classes.itemImg}
            src={
              img_url.slice(0, 4) !== "http" ? "https://" + img_url : img_url
            }
            alt="item"
            // loading="lazy"
          />
          {sold_out && <div className={classes.sold_out}>SOLDOUT</div>}
        </div>
        <div className={classes.notThumbnail}>
          <div
            className={`${classes.description} ${
              sold_out && classes.soldOutText
            }`}
          >
            {/* <a href={detail_page_url} target="_blank" rel="noreferrer"> */}
            <span className={classes.brand}>[{brand}] </span>
            <span className={classes.item_name}>{name}</span>
            {/* <span style={{paddingLeft: '10px', color: 'blue', fontWeight: 'bold', fontSize: '16px'}}>{Math.round(score*100)/100}</span> */}
          </div>
          <div className={classes.other_info}>
            <div
              className={`${classes.price} ${sold_out && classes.soldOutText}`}
            >
              {sale === "True" ? (
                <>
                  <div>
                    <s className={classes.price__original}>
                      {formatPrice(original_price)}원
                    </s>
                  </div>
                  <div>
                    <span className={classes.price__sale}>
                      {formatPrice(sale_price)}원
                    </span>
                    <span className={classes.price__percentage}>
                      {Math.round(
                        ((original_price - sale_price) / original_price) * 100
                      )}
                      %
                    </span>
                  </div>
                </>
              ) : (
                <span className={classes.price_wo_sale}>
                  {formatPrice(original_price)}원
                </span>
              )}
            </div>
            <div className={classes.go_to_website}>
              <a
                href={detail_page_url}
                target="_blank"
                rel="noreferrer"
                className={`${classes.go_to_website__link} gtag_go_to_website__link`}
                onClick={recordClickPurchaseButton}
              >
                구매하기{" "}
                <OpenInNewIcon fontSize="small" className={classes.link_icon} />
              </a>
              <div className={classes.website_info}>
                판매처: {getShopName(id, "kor")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Item;
