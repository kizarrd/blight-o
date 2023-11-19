import classes from "./LogoH1.module.css";
import { Link } from "react-router-dom";

const LogoH1 = ({scrolledDown=false}) => {
  return (
    <h1 className={scrolledDown && classes['flat-h1']}>
      <Link to="items">
        <span>Blight</span>
        <span className={classes.white}>-</span>
        <span className={classes.orange}>O</span>
      </Link>
    </h1>
  );
};

export default LogoH1;
