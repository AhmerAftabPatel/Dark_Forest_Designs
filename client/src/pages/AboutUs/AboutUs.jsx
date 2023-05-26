import {
  AppDownload,
  Footer,
  NewsLetter,
  OurFeatures,
  OurHistory,
} from "../../components";
import { Helmet } from "react-helmet";
const AboutUs = () => (
  <section>
    <Helmet>
      <meta charSet="utf-8" />
      <title>About</title>
    </Helmet>
    <div className="about">
      <div className="about__home">
        <div className="about__home__desc container-div grid">
          <div>
            <h3>About Us</h3>
            <p>
            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
            </p>
          </div>
        </div>
      </div>
    </div>

    <OurHistory />
    <OurFeatures />
    <NewsLetter />
    {/* <AppDownload /> */}
    <Footer />
  </section>
);

export default AboutUs;
