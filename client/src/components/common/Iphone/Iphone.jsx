import { iphone } from "../../../assets";

const Iphone = () => (
  <section className="iphone-section">
    <h2 className="title">100% Hand Crafted</h2>
    <div className="iphone">
      <div className="container-div iphone__container grid">
        <div className="iphone__left grid">
          <div className="end">
            <h4>Design</h4>
            <p>
            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
            </p>
          </div>
          <div>
            <h4>Personalised</h4>
            <p>
            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
            </p>
          </div>
        </div>
        <div className="iphone__middle">
          <img src={iphone} alt="" />
        </div>
        <div className="iphone__right grid">
          <div className="end">
            <h4>Night Mode</h4>
            <p>
            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
            </p>
          </div>
          <div>
            <h4>Handmade</h4>
            <p>
            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Iphone;
