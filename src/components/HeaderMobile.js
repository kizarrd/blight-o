import { Link, NavLink } from "react-router-dom";
import Search from "./Search";
import classes from "./HeaderMobile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import NavDrawerMobile from "./UI/NavDrawerMobile";
import Logo from "./Design/Logo";
import MenuIcon from "@mui/icons-material/Menu";
import { navOpenActions } from "../store/navopen-slice";


const HeaderMobile = () => {
  // const [navOpen, setNavOpen] = useState("initial");
  const navOpen = useSelector((state) => state.navOpen.state);
  const dispatch = useDispatch();
  // const openNavHandler = () => {
  //   setNavOpen("open");
  // };

  // const closeNavHandler = () => {
  //   setNavOpen("closed");
  // };

  return (
    <header className="App-header">
      <div className={classes.headerLeft}>
        <button
          onClick={() => {
            // setNavOpen(navOpen === "initial" || "closed" ? "open" : "closed");
            if(navOpen === 'initial' || navOpen === 'closed'){
              dispatch(navOpenActions.setOpen());
            } else {
              dispatch(navOpenActions.setClose());
            }
          }}
        >
          <MenuIcon fontSize="large" className={classes.menuIcon} />
        </button>
        <Logo />
      </div>
      <Search />
    </header>
  );
};

export default HeaderMobile;
