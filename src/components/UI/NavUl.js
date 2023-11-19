import { NavLink } from "react-router-dom";
import classes from "./NavUl.module.css";
import { useSelector } from "react-redux";

const NavUl = ({pages, mobile, onClose}) => {
  const loading = useSelector((state) => state.loading.state);

  return (
    <ul className={classes.navUl}>
      {pages.map(({ pageName, pagePath }) => (
        <li className={`${classes.navList} ${mobile}`}>
          <NavLink
            to={pagePath}
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            onClick={(e) => {
              if (mobile) {
                onClose();
              }
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
        </li>
      ))}
    </ul>
  );
};

export default NavUl;
