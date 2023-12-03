import { useDispatch } from "react-redux";
import { searchActions } from "../store/search-slice";
import { loadingActions } from "../store/loading-slice";
import { useEffect } from "react";
import { NUM_ITEMS_IN_A_PAGE } from "../components/utils/constants";

export const useDispatchSearchData = (validFetchInfo) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (validFetchInfo === null) {
        return;
      }
      dispatch(loadingActions.setLoading());
      // /items 와 같은 url을 입력할 것을 대비. 해당 searchParams 없어도 null이 아닌 valid한 값을 넣은 url로 fetch할 수 있도록.
      let API_URL = `${
        process.env.REACT_APP_API_BASE
      }/items/search?keyword=${validFetchInfo.keyword}&skip=${
        NUM_ITEMS_IN_A_PAGE * (validFetchInfo.validPageNum - 1)
      }&limit=${NUM_ITEMS_IN_A_PAGE}`;
      console.log(API_URL);
      const { data, count, limit } = await (
        await fetch(API_URL)
      ).json();
      // 서버에서 받아온 limit(즉 DB에서 데이터를 가져올때 실제 사용된 limit 값을 받아 아래에서 dispatch하기 때문에 실제 데이터의 개수와 pagination UI 를 일치시킬 수 있다.)
      // 즉 혹시나 있을지 모르는 API URL조작에도 UI가 실제랑 다르다던지 하는 일이 발생하지 않는다. UI 자체가 URL에 dependent하기 때문이다.
      dispatch(searchActions.load({ data, count, limit }));
      dispatch(loadingActions.setIdle());
    })();
  }, [validFetchInfo, dispatch]);

  return;
};