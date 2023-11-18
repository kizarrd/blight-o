import styles from "./NavDrawerDesktop.module.css";

const Backdrop = (props) => {
  return (
    <div
      className={`${styles.backdrop} ${props.className}`}
      onClick={props.onClose}
    ></div>
  );
};

const NavDrawer = (props) => {
  return (
    <nav className={`${styles.drawer} ${props.className}`}>
      {props.children}
    </nav>
  );
};

const NavDrawerDesktop = (props) => {
  return (
    <>
      <Backdrop
        className={props.open === "open" ? styles["open-backdrop"] : ""}
        onClose={props.onClose}
      />
      <NavDrawer
        className={
          props.open === "initial"
            ? ""
            : props.open === "open"
            ? styles["open-drawer"]
            : styles["closed-drawer"]
        }
      >
        {props.children}
      </NavDrawer>
    </>
  );
};

export default NavDrawerDesktop;
