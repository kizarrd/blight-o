import Pagination from "../components/Pagination";
import ItemList from "../components/ItemList";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useValidPageForCategory } from "../hooks/useValidPageForCategory";
import { useDispatchCategoryData } from "../hooks/useDispatchCategoryData";

const CategoryPage = () => {

  const { validPageNum, bigCategory, smallCategory, fetchingReady } = useValidPageForCategory();
  useDispatchCategoryData(validPageNum, bigCategory, smallCategory, fetchingReady);

  // useEffect(() => {
  //   console.log(bigCategory, smallCategory);
  // }, [bigCategory, smallCategory])
  return (
    <>
      <h1 style={{ marginTop: '800px'}}>Category! {validPageNum}</h1>
      <ItemList />
      <Pagination />
    </>
  );
};

export default CategoryPage;
