import BasePage from "./BasePage";
import AboutImg from "../assets/about.png";

export default function AboutPage() {
  return (
    <>
      <BasePage>
        <h1> Who we are?</h1>{" "}
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat at
          quasi similique vero amet nemo et pariatur veritatis tempora
          repellendus, nesciunt, perferendis aut alias soluta esse, nisi in
          voluptas nostrum.
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
