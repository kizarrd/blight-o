import Pagination from "../components/Pagination";
import ItemList from "../components/ItemList";
import { useValidPageForSearch } from "../hooks/useValidPageForSearch";
import { useDispatchSearchData } from "../hooks/useDispatchSearchData";

const ItemListPage = () => {

  const { validPageNum, searchKeyword, fetchingReady } = useValidPageForSearch();
  useDispatchSearchData(validPageNum, searchKeyword, fetchingReady);

  return (
    <>
      <ItemList />
      <Pagination />
    </>
  );
};

export default ItemListPage;
