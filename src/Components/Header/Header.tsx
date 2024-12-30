import "./Header.css";
import logo from "../../Assets/logo-corte.png";

const Header = () => {
  const modName = "Acordadas y Resoluciones";
  return (
    <div>
      <label className="TW_HeaderStyle text-3xl  font-Roboto font-bold">
        <img src={logo} className="TW_HeaderImageProperties" />
        <p className="TW_HeaderTitleProperties">{modName}</p>
      </label>
    </div>
  );
};
export default Header;
