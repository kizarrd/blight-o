import Pagination from "../components/Pagination";
import ItemList from "../components/ItemList";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { searchActions } from "../store/search-slice";
import { loadingActions } from "../store/loading-slice";

const NUM_ITEMS_IN_A_PAGE = 60;

const ItemListPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const loading = useSelector((state) => state.loading.state);
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
      let API_URL = `${
        process.env.REACT_APP_API_BASE
      }/items/search?keyword=${keyword}&skip=${
        NUM_ITEMS_IN_A_PAGE * (page - 1)
      }&limit=${NUM_ITEMS_IN_A_PAGE}`;
      console.log(API_URL);
      const { data, count, limit, maxPage } = await (
        await fetch(API_URL)
      ).json();
      // 서버에서 받아온 limit(즉 DB에서 데이터를 가져올때 실제 사용된 limit 값을 받아 아래에서 dispatch하기 때문에 실제 데이터의 개수와 pagination UI 를 일치시킬 수 있다.)
      // 즉 혹시나 있을지 모르는 API URL조작에도 UI가 실제랑 다르다던지 하는 일이 발생하지 않는다. UI 자체가 URL에 dependent하기 때문이다.
      if (page > maxPage) {
        // fetch 하는 URL에는 최대 skip 수를 초과해도 서버쪽에서 알아서 최대 skip값에 대한 데이터를 리턴하도록 구현해 놓았다.
        // 따라서 우리는 FE상에서의 UI안내(alert)와 URL을 실제 데이터(마지막 페이지 데이터)와 동기화 하는 것만 신경쓰면 된다.
        dispatch(loadingActions.setIdle());
        alert("최대 페이지 수를 초과하였습니다. 마지막 페이지로 이동합니다.");
        setSearchParams({ keyword, page: maxPage });
        return; // 이 경우에 아래에서 데이터를 디스패치 하기 전에 리턴해준다. (안그러면 화면에 두번 그리게 됨)
      }
      console.log(data, count, limit, maxPage);
      dispatch(searchActions.load({ data, count, limit }));
      dispatch(loadingActions.setIdle());
    })();
  }, [dispatch, searchParams]);

  return (
    <>
      <ItemList />
      <Pagination />
    </>
  );
};

export default ItemListPage;
