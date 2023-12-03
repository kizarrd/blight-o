import Pagination from "../components/Pagination";
import ItemList from "../components/ItemList";
import { useValidPageForCategory } from "../hooks/useValidPageForCategory";
import { useDispatchCategoryData } from "../hooks/useDispatchCategoryData";

const CategoryPage = () => {
  const { validFetchInfo } = useValidPageForCategory();
  useDispatchCategoryData(validFetchInfo);
  return (
    <>
      <ItemList />
      <Pagination />
    </>
  );
};

export default CategoryPage;
