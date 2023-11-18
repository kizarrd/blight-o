import { Link, NavLink } from "react-router-dom";
import Search from "./Search";
import classes from "./Header.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import NavDrawerDesktop from "./Nav/NavDrawerDesktop";

const Header = () => {
  const loading = useSelector((state) => state.loading.state);
  const [navOpen, setNavOpen] = useState("initial");
  const [screenIsWide, setScreenIsWide] = useState(false);

  const openNavHandler = () => {
    setNavOpen("open");
  };

  const closeNavHandler = () => {
    setNavOpen("closed");
  };

  return (
    <header className="App-header">
      <button
        onClick={() => {
          setNavOpen(navOpen === "initial" || "closed" ? "open" : "closed");
        }}
      >
        =
      </button>
      <h1>
        <Link to="items">
          <span>Blight</span>
          <span className={classes.white}>-</span>
          <span className={classes.orange}>O</span>
        </Link>
      </h1>
      <Search />
      {!screenIsWide && (
        <NavDrawerDesktop onClose={closeNavHandler} open={navOpen}>
          <ul
            className={`${classes.navUl} ${navOpen && classes["navUl-open"]}`}
          >
            <li className={classes.navList}>
              <NavLink
                to="/items"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                onClick={closeNavHandler}
              >
                Items
              </NavLink>
            </li>
            <li className={classes.navList}>
              <NavLink
                to="/brands"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                onClick={(e) => {
                  closeNavHandler();
                  if (loading) {
                    e.preventDefault();
                    alert(
                      "아직 이전 검색 결과의 데이터를 불러오는 중입니다. 잠시 후 다시 시도해 주세요"
                    );
                    return;
                  }
                }}
              >
                Brands
              </NavLink>
            </li>
          </ul>
        </NavDrawerDesktop>
      )}

      {/* <Search /> */}
    </header>
  );
};

export default Header;
