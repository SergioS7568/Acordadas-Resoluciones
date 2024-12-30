import { version } from "../../../package.json";
import "./Footer.css";

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <div className="TW_FooterStyle ">
      <p className="TW_FooterLabelProperties">
        © {year} - Poder Judicial de Tucumán - Dirección de Sistemas
      </p>
      <p className="TW_FooterLabelVersionProperties">v{version}</p>
    </div>
  );
};
export default Footer;
