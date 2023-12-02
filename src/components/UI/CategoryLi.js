import { NavLink } from "react-router-dom";

import desktopClasses from "./CategoryLiDesktop.module.css";
import mobileClasses from "./CategoryLiMobile.module.css";

const CategoryLi = ({
  mobile,
  smallCategories,
  onClose,
  loading,
  pageName,
}) => {
  const classes = mobile ? mobileClasses : desktopClasses;
  return (
    <>
      <li className={`${classes.navList}`}>
        <div className={`${classes.bigCategory}`}>{pageName}</div>
        <ul className={`${classes.subNavUl}`}>
          {smallCategories.map(({ pageName, pagePath }) => (
            <li>
              <NavLink
                to={pagePath}
                className={({ isActive }) =>
                  isActive ? classes.active : ''
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
      </li>
    </>
  );
};

export default CategoryLi;
