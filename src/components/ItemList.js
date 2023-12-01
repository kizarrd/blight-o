import { useSelector } from "react-redux";
import Item from "./Item";
import "./ItemList.module.css";

const ItemList = () => {
  const itemListDataBySearch = useSelector(
    (state) => state.search.searchResult
  );
  const loading = useSelector((state) => state.loading.state);

  return (
    <>
      {loading ? (
        <p>Loading ...</p>
      ) : itemListDataBySearch.length > 0 ? (
        <ul>
          {itemListDataBySearch.map((data) => (
            <Item key={data._id} data={data} />
          ))}
        </ul>
      ) : (
        <p
          style={{
            padding: "30px",
            textAlign: "center",
            lineHeight: "24px",
          }}
        >
          검색 결과가 없습니다.
          <br />
          철자와 띄어쓰기, 페이지 숫자 등을 확인해 주세요.
        </p>
      )}
    </>
  );
};

export default ItemList;
