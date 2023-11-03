import { json, useLoaderData, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { searchActions } from "../store/search-slice";
import Pagination from "./Pagination";
import Search from "./Search";
import Item from "./Item";
import styled from "@emotion/styled";

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

  return (
    <>
      <Search />
      {loadedData.length > 0 ? (
        <ul>
          {itemListDataBySearch.map((data) => (
            <Item data={data} />
          ))}
        </ul>
      ) : (
        <div style={{padding: '30px', textAlign: 'center', lineHeight: '24px'}}>검색 결과가 없습니다.<br />철자와 띄어쓰기 등을 확인해 주세요.</div>
      )}

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
  let API_URL =
    "http://localhost:8080/items" +
    (searchTerm === null ? "" : `/search?keyword=${searchTerm}`);
  const response = await fetch(API_URL);
  // console.log(response);
  if (!response.ok) {
    throw json({ message: "Could not fetch items" }, { status: 500 });
  } else {
    return response;
  }
};
