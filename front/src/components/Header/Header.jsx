import reactImg from "../../assets/react-logo.png";
import "./Header.css";

const reactDescription = ["Fundamental", "Crucial", "Core"];
function randomIntGen(max) {
  return Math.floor(Math.random() * (max + 1));
}

export default function Header() {
  return (
    <header>
      <img src={reactImg} alt="Stylized atom" />
      <h1 className="header-title">Why MoneyMaster?!</h1>
      <p className="header-description">
        {reactDescription[randomIntGen(2)]} Different usage of this application
      </p>
    </header>
  );
}
