import { NavLink } from "react-router-dom";
import classes from "./NavDrawerMobile.module.css";
import { useSelector } from "react-redux";
import NavUl from "./NavUl";

const Backdrop = (props) => {
  return (
    <div
      className={`${classes.backdrop} ${props.className}`}
      onClick={props.onClose}
    ></div>
  );
};

const NavDrawer = (props) => {
  return (
    <nav className={`${classes.drawer} ${props.className}`}>
      {props.children}
    </nav>
  );
};

const NavDrawerMobile = ({ open, onClose, pages }) => {
  return (
    <>
      <Backdrop
        className={open === "open" ? classes["open-backdrop"] : ""}
        onClose={onClose}
      />
      <NavDrawer
        className={
          open === "initial"
            ? ""
            : open === "open"
            ? classes["open-drawer"]
            : classes["closed-drawer"]
        }
      >
        <NavUl pages={pages} mobile={true} onClose={onClose} />
        {/* <ul className={classes.navUl}>
          {pages.map(({pageName, pagePath}) => <li className={classes.navList}>
            <NavLink
              to={pagePath}
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              onClick={(e) => {
                onClose();
                if (loading) {
                  e.preventDefault();
                  alert(
                    "검색 결과를 불러오는 중입니다. 잠시 후에 다시 시도해 주세요."
                  );
                  return;
                }
              }}
            >
              {pageName}
            </NavLink>
          </li>)}
        </ul> */}
      </NavDrawer>
    </>
  );
};

export default NavDrawerMobile;
