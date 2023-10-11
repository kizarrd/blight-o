import { Link } from "react-router-dom";
import Search from "./Search";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className="App-header">
      <h1>
        <Link to="items">
          <span>Blight</span>
          <span className={styles.white}>-</span>
          <span className={styles.orange}>O</span>
          {/* <span className={styles.white}>Blight</span>
          <span>-</span>
          <span className={styles.orange}>O</span> */}
        </Link>
      </h1>
      <Search />
    </header>
  );
};

export default Header;
