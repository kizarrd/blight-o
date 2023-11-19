import Pagination from "../components/Pagination";
import ItemList from "../components/ItemList";
import NavDrawerMobile from "../components/UI/NavDrawerMobile";
import { useDispatch, useSelector } from "react-redux";
import { navOpenActions } from "../store/navopen-slice";

const ItemListPage = () => {
  const navOpen = useSelector((state) => state.navOpen.state);
  const dispatch = useDispatch();

  return (
    <>
      <NavDrawerMobile
        onClose={() => {
          dispatch(navOpenActions.setClose());
        }}
        open={navOpen}
        pages={[
          { pageName: "Items", pagePath: "/items" },
          { pageName: "Brands", pagePath: "/Brands" },
        ]}
      ></NavDrawerMobile>
      <ItemList />
      <Pagination />
    </>
  );
};

export default ItemListPage;
