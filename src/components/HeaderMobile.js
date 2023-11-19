import Search from "./Search";
import classes from "./HeaderMobile.module.css";
import { useDispatch, useSelector } from "react-redux";
import Logo from "./Design/Logo";
import MenuIcon from "@mui/icons-material/Menu";
import { navOpenActions } from "../store/navopen-slice";


const HeaderMobile = () => {
  const navOpen = useSelector((state) => state.navOpen.state);
  const dispatch = useDispatch();

  return (
    <header className="App-header">
      <div className={classes.headerLeft}>
        <button
          onClick={() => {
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
