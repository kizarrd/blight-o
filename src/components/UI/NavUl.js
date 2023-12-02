import { NavLink } from "react-router-dom";
import desktopClasses from "./NavUlDesktop.module.css";
import mobileClasses from "./NavUlMobile.module.css";
import { useSelector } from "react-redux";
import CategoryLi from "./CategoryLi";

const NavUl = ({ pages, mobile, onClose, scrolledDown }) => {
  const loading = useSelector((state) => state.loading.state);
  const classes = mobile ? mobileClasses : desktopClasses;

  return (
    <ul className={`${classes.navUl} ${scrolledDown && classes.scrolledDown}`}>
      {pages.map(
        ({ category, singleCategory, pageName, pagePath, smallCategories }) =>
          category && !singleCategory ? (
            <CategoryLi
              mobile={mobile}
              smallCategories={smallCategories}
              onClose={onClose}
              loading={loading}
              pageName={pageName}
            />
          ) : (
            <li className={`${classes.navList}`}>
              <NavLink
                to={pagePath}
                className={({ isActive }) =>
                  `${isActive ? classes.active : undefined} ${classes.headerCategoryCommon}`
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
          )
      )}
    </ul>
  );
};

export default NavUl;
