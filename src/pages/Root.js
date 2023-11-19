import { Outlet } from "react-router-dom";
import HeaderMobile from "../components/HeaderMobile";
import { useState } from "react";
import './Root.module.css';
import NavDrawerMobile from "../components/UI/NavDrawerMobile";
import { useDispatch, useSelector } from "react-redux";
import { navOpenActions } from "../store/navopen-slice";

const RootLayout = () => {
  const [screenIsWide, setScreenIsWide] = useState(false);
  const navOpen = useSelector((state) => state.navOpen.state);
  const dispatch = useDispatch();

  return (
    <div className="app">
      {screenIsWide ? "" : <HeaderMobile />}
      {screenIsWide ? "" : 
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
      }
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
