import Pagination from "../components/Pagination";
import ItemList from "../components/ItemList";
import { useValidPageForCategory } from "../hooks/useValidPageForCategory";
import { useDispatchCategoryData } from "../hooks/useDispatchCategoryData";

const CategoryPage = () => {
  const { validPageNum, bigCategory, smallCategory, fetchingReady } = useValidPageForCategory();
  useDispatchCategoryData(validPageNum, bigCategory, smallCategory, fetchingReady);

  return (
    <>
      <ItemList />
      <Pagination />
    </>
  );
};

export default CategoryPage;
