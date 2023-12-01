import classes from "./HeaderDesktop.module.css";
import Logo from "./Design/LogoH1";
import Search from "./Search";
import NavUl from "./UI/NavUl";
import useScrollDownHeight from "./utils/useScrollDownHeight";

const HeaderDesktop = ({ pages, mobile, onClose }) => {
  const scrolledDown = useScrollDownHeight(20);

  return (
    <header className={scrolledDown && classes['flat-header']}>
      <div className={scrolledDown && classes['flat-left']}>
        <Logo scrolledDown={scrolledDown}/>
        <nav>
          <NavUl pages={pages} mobile={mobile} onClose={onClose} />
        </nav>
      </div>
      <Search scrolledDown={scrolledDown}/>
      <div id="subheader-root">subheader!</div>
    </header>
  );
};

export default HeaderDesktop;
