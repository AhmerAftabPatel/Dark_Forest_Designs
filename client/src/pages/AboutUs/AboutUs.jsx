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
            <h3>Who We Are</h3>
            <p>
            At the heart of Darkforest Designs is a team of skilled artisans and craftsmen dedicated to bringing your vision to life. With a rich heritage in woodworking and a contemporary approach to design, we embark on a journey to transform spaces into expressions of individuality and elegance. Our journey began with a simple yet profound goal – to create timeless pieces that resonate with the unique character of every home or space they adorn.
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
