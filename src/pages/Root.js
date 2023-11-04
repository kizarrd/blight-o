import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import styles from "./Root.module.css";

const RootLayout = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
