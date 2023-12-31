import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { loadingActions } from "../store/loading-slice";
import { NUM_ITEMS_IN_A_PAGE } from "../components/utils/constants";

export const useValidPageForSearch = () => {
  const [validFetchInfo, setValidFetchInfo] = useState(null);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    console.log('hi triggered');
    (async () => {
      dispatch(loadingActions.setLoading());
      const keywordParam = searchParams.get("search");
      const pageParam = searchParams.get("page");
      const keyword = keywordParam === null ? "" : keywordParam;
      // /items 와 같은 url을 입력할 것을 대비. 해당 searchParams 없어도 null이 아닌 valid한 값을 넣은 url로 fetch할 수 있도록.
      let page = pageParam === null ? 1 : Number(pageParam);

      // pageNumber invalid 한 경우(1미만, maxpage 초과인 경우)에만 setSearchParam을 통해 query string을 재설정 해준다.
      if (page < 1) {
        alert("페이지는 최소 1페이지 이상이어야 합니다. 1페이지로 이동합니다.");
        // setSearchParams(`?keyword=${keyword}&page=${1}`); // 얘도 아래줄이랑 똑같이 작동함. 신기.
        page = 1;
        setSearchParams({ search: keyword, page });
        dispatch(loadingActions.setIdle());
        return;
      } else if (page > 1) {
        // console.log(keyword, page);
        let API_URL = `${process.env.REACT_APP_API_BASE}/items/count-search-result?keyword=${keyword}&limit=${NUM_ITEMS_IN_A_PAGE}`;
        console.log(API_URL);
        const { count, maxPage } = await (await fetch(API_URL)).json();
        console.log(count, maxPage);
  
        if (page > maxPage) {
          // fetch 하는 URL에는 최대 skip 수를 초과해도 서버쪽에서 알아서 최대 skip값에 대한 데이터를 리턴하도록 구현해 놓았다.
          // 따라서 우리는 FE상에서의 UI안내(alert)와 URL을 실제 데이터(마지막 페이지 데이터)와 동기화 하는 것만 신경쓰면 된다.
          alert("최대 페이지 수를 초과하였습니다. 마지막 페이지로 이동합니다.");
          page = maxPage;
          setSearchParams({ search: keyword, page });
          dispatch(loadingActions.setIdle());
          return;
        }
      }

      // 여기까지 왔으면 page가 valid하다는 것이고 따라서 setValidPageNum을 해준다.
      setValidFetchInfo({ validPageNum: page, keyword })
      dispatch(loadingActions.setIdle());
    })();
  }, [searchParams, setSearchParams, dispatch]);

  return {
    validFetchInfo,
  };
};