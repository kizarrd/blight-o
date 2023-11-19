import classes from './Logo.module.css';
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <h1>
    <Link to="items">
      <span>Blight</span>
      <span className={classes.white}>-</span>
      <span className={classes.orange}>O</span>
    </Link>
  </h1>
  )
};

export default Logo;