import { Outlet } from "react-router-dom";
import HeaderMobile from "../components/HeaderMobile";
import styles from "./Root.module.css";
import { useState } from "react";


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
