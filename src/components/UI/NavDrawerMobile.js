import classes from "./NavDrawerMobile.module.css";
import NavUl from "./NavUl";

const Backdrop = (props) => {
  return (
    <div
      className={`${classes.backdrop} ${props.className}`}
      onClick={props.onClose}
    ></div>
  );
};

const NavDrawer = (props) => {
  return (
    <nav className={`${classes.drawer} ${props.className}`}>
      {props.children}
    </nav>
  );
};

const NavDrawerMobile = ({ open, onClose, pages }) => {
  return (
    <>
      <Backdrop
        className={open === "open" ? classes["open-backdrop"] : ""}
        onClose={onClose}
      />
      <NavDrawer
        className={
          open === "initial"
            ? ""
            : open === "open"
            ? classes["open-drawer"]
            : classes["closed-drawer"]
        }
      >
        <NavUl pages={pages} mobile={true} onClose={onClose} />
      </NavDrawer>
    </>
  );
};

export default NavDrawerMobile;
