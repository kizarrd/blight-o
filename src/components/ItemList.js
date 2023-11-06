import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { searchActions } from "../store/search-slice";
import Item from "./Item";
import { loadingActions } from "../store/loading-slice";
import "./ItemList.module.css";

const NUM_ITEMS_IN_A_PAGE = 60;

const ItemList = () => {
  const itemListDataBySearch = useSelector(
    (state) => state.search.searchResult
  );
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const loading = useSelector((state) => state.loading.state);
  // const [keyword, setKeyword] = useState("a");

  useEffect(() => {
    (async () => {
      if (loading) {
        return;
      }
      dispatch(loadingActions.setLoading());
      const keywordParam = searchParams.get("search");
      const pageParam = searchParams.get("page");
      const keyword = keywordParam === null ? "" : keywordParam;
      let page = pageParam === null ? 1 : Number(pageParam);
      // /items 와 같은 url을 입력할 것을 대비. 해당 searchParams 없어도 null이 아닌 valid한 값을 넣은 url로 fetch할 수 있도록.
      if (page < 1) {
        alert("페이지는 최소 1페이지 이상이어야 합니다. 1페이지로 이동합니다.");
        // setSearchParams(`?keyword=${keyword}&page=${1}`); // 얘도 아래줄이랑 똑같이 작동함. 신기.
        setSearchParams({ keyword, page: 1 });
        page = 1;
      }
      // console.log(keyword, page);
      let API_URL = `http://localhost:8080/items/search?keyword=${keyword}&skip=${
        NUM_ITEMS_IN_A_PAGE * (page - 1)
      }&limit=${NUM_ITEMS_IN_A_PAGE}`;
      console.log(API_URL);
      const { data, count, limit, maxPage } = await (await fetch(API_URL)).json();
      // 서버에서 받아온 limit(즉 DB에서 데이터를 가져올때 실제 사용된 limit 값을 받아 아래에서 dispatch하기 때문에 실제 데이터의 개수와 pagination UI 를 일치시킬 수 있다.)
      // 즉 혹시나 있을지 모르는 API URL조작에도 UI가 실제랑 다르다던지 하는 일이 발생하지 않는다. UI 자체가 URL에 dependent하기 때문이다. 
      if(page > maxPage){
        alert("최대 페이지 수를 초과하였습니다. 마지막 페이지로 이동합니다.");
        setSearchParams({ keyword, page: maxPage});
      }
      console.log(data, count, limit, maxPage);
      dispatch(searchActions.load({ data, count, limit }));
      dispatch(loadingActions.setIdle());
    })();
  }, [dispatch, searchParams]);

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
