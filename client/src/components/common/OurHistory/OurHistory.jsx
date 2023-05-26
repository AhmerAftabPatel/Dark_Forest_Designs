import ourHistory from '../../../assets/images/our-history.jpg'

const OurHistory = () => (
  <div className="history grid container-div">
    <img className="history__img" src={ourHistory} alt="" />
    <div className="history__content grid">
      <div className="history__content__text">
        <h5>OUR SAMRAL HISTORY</h5>
        <h2>Setting Industry Standards</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>

      <div className="history__content__customer">
        <h1>100</h1>
        <h6>CUSTOMERS​</h6>
        <p>Satisfied customers worldwide and growing</p>
      </div>
    </div>
  </div>
)

export default OurHistory
