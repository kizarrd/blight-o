import { Link, NavLink } from "react-router-dom";
import Search from "./Search";
import classes from "./Header.module.css";
import { useSelector } from "react-redux";

const Header = () => {
  const loading = useSelector((state) => state.loading.state);

  return (
    <header className="App-header">
      <h1>
        <Link to="items">
          <span>Blight</span>
          <span className={classes.white}>-</span>
          <span className={classes.orange}>O</span>
        </Link>
      </h1>
      {/* <Search /> */}
      <nav>
        <ul className={classes.navUl}>
          <li className={classes.navList}>
            <NavLink
              to="/items"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Search
            </NavLink>
          </li>
          <li className={classes.navList}>
            <NavLink
              to="/brands"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              onClick={(e) => {
                if(loading){
                  e.preventDefault();
                  alert('아직 이전 검색 결과의 데이터를 불러오는 중입니다. 잠시 후 다시 시도해 주세요');
                  return;
                }
              }}
            >
              Brands
            </NavLink>
          </li>
        </ul>
      </nav>
      <Search />
    </header>
  );
};

export default Header;
