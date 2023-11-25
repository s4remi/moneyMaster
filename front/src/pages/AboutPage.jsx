import BasePage from "./BasePage";
import AboutImg from "../assets/about.png";

export default function AboutPage() {
  return (
    <>
      <BasePage>
        <h1> Who we are?</h1>{" "}
        <div>
          MC2 Tech isn't just an app development company; we are a collective of
          visionaries and problem-solvers. Our commitment goes beyond writing
          lines of code; it's about understanding your goals and translating
          them into intuitive, user-centric applications. We're not just
          developers; we're your technology partners in success.
        </div>
        <h2> Other Production</h2>{" "}
        <ul>
          <li>eccomerce book store</li>
          <li>Protein AR for andriod mobiles</li>
        </ul>
        <img src={AboutImg} alt="about png picture" />
        <h2>Stuck price</h2>
        <h2>News and Results</h2>
      </BasePage>
    </>
  );
}
