import BasePage from "./BasePage";
import AboutImg from "../assets/personal.png";
import "./AboutPage.css";

export default function AboutPage() {
  return (
    <>
      <BasePage>
        <div className="about_container">
          <div className="about_contents">
            {/* image section starts*/}
            <section className="imageSection">
              <img src={AboutImg} alt="personal picture" />
            </section>
            <section className="infoSection">
              <h1>About Me</h1>
              <h2>
                👋 Hi, I am currently a student in the Khoury College of
                Computer Science at Northeastern University, San Francisco
                campus.
              </h2>
              <p>
                I am hoping to graduate in 2024. Prior to this, I earned my
                B.Eng in civil Engineering and AS in Mathematics. I am highly
                interested in most areas of computer science, with a particular
                interest in computer graphics such as AR, VR, Visualization, and
                Computer Vision.
              </p>
              <p>
                I hope to maintain my passion for computer graphics and pursue
                relevant job opportunities in the future. In addition to
                computer graphics, I am also interested in backend development
                technologies such as distributed systems and networking.
              </p>
              <div className="personalInfo">
                <div>
                  <span>Name:</span>
                  <span>Ali Saremi</span>
                </div>
                <div>
                  <span>Email:</span>
                  <span>s4remi@gmail.com</span>
                </div>
              </div>
              <div className="divbutton">
                <button>
                  <a href="https://ali-resume-html.onrender.com/">Portfolio</a>
                </button>
              </div>
            </section>
            {/* end of the info */}
          </div>
        </div>
      </BasePage>
    </>
  );
}
