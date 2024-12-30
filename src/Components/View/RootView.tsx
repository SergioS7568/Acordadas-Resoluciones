import { useEffect, useState } from "react";

import "./RootView.css";

import Table from "../Body/Table/Table";
import Footer from "../Footer/Footer";

import Header from "../Header/Header";
import CustomButton from "../Buttons/CustomButton";
import Filters from "../Body/Filters/Filters";

const RootView = () => {
  const [theme, setTheme] = useState("light");

  const onClickMoveTowardsTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div
      className={
        theme === "dark"
          ? "bg-darkBlackOption-0 dark    flex flex-col font-roboto mx-auto    min-h-screen   pr-4 pl-4  md:pr-6 md:pl-6   "
          : " bg-grayOption-0 flex flex-col font-roboto mx-auto    min-h-screen   pr-4 pl-4  md:pr-6 md:pl-6 "
      }
    >
      <Header />

      <Filters />
      <Table />
      <Footer />
      <div className="  z-20 fixed bottom-5 right-5 gap-1 flex flex-col">
        <button
          className="btn btn-circle opacity-70 hover:opacity-95 dark:border-darkBlueShift-0 dark:bg-darkBlueShift-0
                 border-lightBlueShift-0 bg-lightBlueShift-0 hover:bg-lightBlueShift-0  dark:hover:bg-lightBlueShift-0 "
          onClick={() => toggleTheme()}
        >
          {theme === "dark" ? (
            <CustomButton imageName="moon" />
          ) : (
            <CustomButton imageName="sun" />
          )}
        </button>
        <button
          className="btn btn-circle opacity-70 hover:opacity-100 dark:border-darkBlueShift-0 dark:bg-darkBlueShift-0
                 border-lightBlueShift-0 bg-lightBlueShift-0 hover:bg-lightBlueShift-0  dark:hover:bg-lightBlueShift-0"
          onClick={onClickMoveTowardsTop}
        >
          <CustomButton imageName="arrowTop" />
        </button>
      </div>
    </div>
  );
};
export default RootView;
