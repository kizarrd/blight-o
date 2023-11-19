import Search from "./Search";
import classes from "./HeaderMobile.module.css";
import { useDispatch, useSelector } from "react-redux";
import Logo from "./Design/LogoH1";
import MenuIcon from "@mui/icons-material/Menu";
import { navOpenActions } from "../store/navopen-slice";
import useScrollDownHeight from "./utils/useScrollDownHeight";


const HeaderMobile = () => {
  const scrolledDown = useScrollDownHeight(20);

  const navOpen = useSelector((state) => state.navOpen.state);
  const dispatch = useDispatch();

  return (
    <header className={scrolledDown && classes['mobile-flat-header']}>
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
