const Header = () => {
  const imageLogoURL =
    "https://acordadas.justucuman.gov.ar/img/logos/logo-corte.png";
  const modName = "Acordadas y Resoluciones";
  return (
    <div>
      <label className="flex flex-row justify-between ">
        <img src={imageLogoURL} className="max-h-80 max-w-96" /> {modName}
      </label>
    </div>
  );
};
export default Header;
