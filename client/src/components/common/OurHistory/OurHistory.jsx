import ourHistory from '../../../assets/images/dfdlogo.jpg'

const OurHistory = () => (
  <div className='history grid container-div'>
    <img className='history__img' src={ourHistory} alt='' />
    <div className='history__content grid'>
      <div className='history__content__text'>
        {/* <h5>OUR SAMRAL HISTORY</h5> */}
        <h2>Setting Industry Standards</h2>
        <p>
          Darkforest Designs is not just a brand; it's a benchmark in the
          industry. We set ourselves apart through a relentless pursuit of
          excellence, adhering to the highest standards of craftsmanship and
          quality. Every piece that leaves our workshop is a testament to our
          commitment to precision, durability, and artistic innovation.
        </p>
        <p>
          We believe in pushing boundaries and redefining the possibilities of
          what wood and epoxy resin can achieve together. Our artisans, with
          their meticulous attention to detail, turn raw materials into
          functional works of art, setting a new standard for handcrafted
          interior products.
        </p>
      </div>

      {/* <div className='history__content__customer'>
        <h1>100%</h1>
        <h6>CUSTOMERS​</h6>
        <p>Satisfied customers worldwide and growing</p>
      </div> */}
    </div>
  </div>
)

export default OurHistory
