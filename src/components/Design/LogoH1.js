import classes from "./LogoH1.module.css";
import { Link } from "react-router-dom";

const LogoH1 = ({scrolledDown=false, desktop=false}) => {
  return (
    <h1 className={`${classes.logoH1} ${scrolledDown ? classes['flat-h1'] : ''} ${desktop ? classes.desktop : ''}`}>
      <Link to="items">
        <span>Blight</span>
        <span className={classes.white}>-</span>
        <span className={classes.orange}>O</span>
      </Link>
    </h1>
  );
};

export default LogoH1;
