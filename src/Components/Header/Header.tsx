import "./Header.css";
const Header = () => {
  const imageLogoURL =
    "https://acordadas.justucuman.gov.ar/img/logos/logo-corte.png";
  const modName = "Acordadas y Resoluciones";
  return (
    <div>
      <label className="TW_HeaderStyle">
        <img src={imageLogoURL} className="TW_HeaderImageProperties" />
        {modName}
      </label>
    </div>
  );
};
export default Header;
