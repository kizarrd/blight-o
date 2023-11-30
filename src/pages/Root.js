import { Outlet } from "react-router-dom";
import HeaderMobile from "../components/HeaderMobile";
import { useEffect } from "react";
import "./Root.module.css";
import NavDrawerMobile from "../components/UI/NavDrawerMobile";
import { useDispatch, useSelector } from "react-redux";
import { navOpenActions } from "../store/navopen-slice";
import HeaderDesktop from "../components/HeaderDesktop";
import useWindowDimensions from "../components/utils/useWindowDimensions";
import categoryPages from "../pages/NavContents";

const RootLayout = () => {
  const navOpen = useSelector((state) => state.navOpen.state);
  const dispatch = useDispatch();
  const { screenWidth } = useWindowDimensions();
  const MOBILE_WIDTH = 768;
  useEffect(() => {
    if(navOpen !== 'initial' && screenWidth > MOBILE_WIDTH){
      dispatch(navOpenActions.setInitial());
    }
  }, [screenWidth])

  console.log(categoryPages);

  return (
    <div className="app">
      {screenWidth > MOBILE_WIDTH ? (
        <HeaderDesktop
          onClose={() => {
            dispatch(navOpenActions.setClose());
          }}
          mobile={false}
          pages={categoryPages}
        />
      ) : (
        <HeaderMobile />
      )}
      {screenWidth > MOBILE_WIDTH ? (
        ""
      ) : (
        <NavDrawerMobile
          onClose={() => {
            dispatch(navOpenActions.setClose());
          }}
          open={navOpen}
          pages={categoryPages}
        ></NavDrawerMobile>
      )}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
