import "./Header.css";
import logo from "../../Assets/logo-corte.png";

const Header = () => {
  const modName = "Acordadas y Resoluciones";
  return (
    <div>
      <label className="TW_HeaderStyle">
        <img src={logo} className="TW_HeaderImageProperties" />
        {modName}
      </label>
    </div>
  );
};
export default Header;
