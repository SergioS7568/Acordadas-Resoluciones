import { useEffect, useState } from "react";

import Table from "../Body/Table/Table";
import Footer from "../Footer/Footer";
import Forms from "../Forms/Forms";
import Header from "../Header/Header";
import CustomButton from "../Buttons/CustomButton";

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
    <div>
      <Header />

      <Forms />
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
