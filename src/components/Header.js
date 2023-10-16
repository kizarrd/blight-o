import { Link, NavLink } from "react-router-dom";
import Search from "./Search";
import classes from "./Header.module.css";

const Header = () => {
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
            >
              Brands
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
