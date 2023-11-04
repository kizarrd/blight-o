import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect, useState } from "react";
import { searchActions } from "../store/search-slice";
import Item from "./Item";
import { loadingActions } from "../store/loading-slice";

const ItemList = () => {
  const itemListDataBySearch = useSelector(
    (state) => state.search.searchAndPageResult
  );
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const loading = useSelector((state) => state.loading.state);
  const [keyword, setKeyword] = useState("a");

  useEffect(() => {
    (async () => {
      if (loading) {
        return;
      }
      dispatch(loadingActions.setLoading());
      let data;
      const paramKeyword = searchParams.get("search") === null ? "" : searchParams.get("search");
      console.log(paramKeyword)
      if (paramKeyword !== keyword) {
        setKeyword((prev) => paramKeyword);
        let API_URL =
          "http://localhost:8080/items" +
          (paramKeyword === "" ? "" : `/search?keyword=${paramKeyword}`);
        console.log(API_URL);
        data = await (await fetch(API_URL)).json();
        console.log(data);
        dispatch(searchActions.load({ fetchedData: data }));
      }
      let page = searchParams.get("page");
      dispatch(searchActions.moveToThisPage({ page: page ? Number(page) : 1 }));
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
