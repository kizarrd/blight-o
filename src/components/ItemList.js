import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect, useState } from "react";
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
      let page = pageParam === null ? "1" : pageParam;
      // /items 와 같은 url을 입력할 것을 대비. 해당 searchParams 없어도 null이 아닌 valid한 값을 넣은 url로 fetch할 수 있도록.
      if(Number(page) < 1){
        alert('페이지는 최소 1페이지 이상이어야 합니다. 1페이지로 이동합니다.');
        setSearchParams(`?keyword=${keyword}&page=${1}`);
        page = 1;
      }
      // console.log(keyword, page);
      let API_URL = `http://localhost:8080/items/search?keyword=${keyword}&skip=${NUM_ITEMS_IN_A_PAGE*(page-1)}&limit=${NUM_ITEMS_IN_A_PAGE}`;
      console.log(API_URL);
      const data = await (await fetch(API_URL)).json();
      console.log(data);
      dispatch(searchActions.load({ fetchedData: data }));

      // if (paramKeyword !== keyword) {
      //   setKeyword((prev) => paramKeyword);
      //   let API_URL =
      //     "http://localhost:8080/items" +
      //     (paramKeyword === "" ? "" : `/search?keyword=${paramKeyword}`);
      //   console.log(API_URL);
      //   data = await (await fetch(API_URL)).json();
      //   console.log(data);
      //   dispatch(searchActions.load({ fetchedData: data }));
      // }
      // dispatch(searchActions.moveToThisPage({ page: page ? Number(page) : 1 }));
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
