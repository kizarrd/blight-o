import classes from "./HeaderDesktop.module.css";
import LogoH1 from "./Design/LogoH1";
import Search from "./Search";
import NavUl from "./UI/NavUl";
import useScrollDownHeight from "./utils/useScrollDownHeight";

const HeaderDesktop = ({ pages, mobile, onClose }) => {
  const scrolledDown = useScrollDownHeight(20);

  return (
    <header className={`${classes.headerDesktop} ${scrolledDown && classes["flat-header"]}`}>
      <div className={scrolledDown && classes["flat-left"]}>
        <div className={classes.logoAndSearch}>
          <LogoH1 scrolledDown={scrolledDown} desktop={true} />
          {scrolledDown && <Search scrolledDown={scrolledDown} />}
        </div>
        <nav>
          <NavUl
            scrolledDown={scrolledDown}
            pages={pages}
            mobile={mobile}
            onClose={onClose}
          />
        </nav>
      </div>
      {!scrolledDown && <Search scrolledDown={scrolledDown} />}
    </header>
  );
};

export default HeaderDesktop;
