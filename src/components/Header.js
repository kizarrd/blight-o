import { Link } from "react-router-dom";
import Search from "./Search";

const Header = () => {
  return (
    <header className="App-header">
      <Link to='items'>
        <h1>Blight-O</h1>
      </Link>
      <Search />
    </header>
  );
};

export default Header;
