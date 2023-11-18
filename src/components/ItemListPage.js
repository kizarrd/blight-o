import { useNavigation } from "react-router-dom";
import Search from "./Search";
// import ItemList from "./ItemList";
import Pagination from "./Pagination";
import ItemList from "./ItemList";

const ItemListPage = () => {
  return(
    <>
      <ItemList />
      <Pagination />
    </>
  )

};

export default ItemListPage;