import { Outlet } from "react-router-dom";
import HeaderMobile from "../components/HeaderMobile";
import { useState } from "react";
import './Root.module.css';


const RootLayout = () => {
  const [screenIsWide, setScreenIsWide] = useState(false);


  return (
    <div className="app">
      {screenIsWide ? "" : <HeaderMobile />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
