import { featuresData } from '../../../utils/fakedata'

const OurFeatures = () => (
  <div className='features'>
    <div className='features__container grid container-div'>
      <h3>OUR FEATURES</h3>
      <div className='row text-center'>
        <div className='col-sm'>
          <h4 className='text-center'>Artistry and Precision</h4>
          <p>
            Each piece atDarkforest Designs is a result of the perfect marriage
            between artistic expression and precision craftsmanship.
          </p>
        </div>
        <div className='col-sm'>
          <h4 className='text-center'>Customization</h4>
          <p>
            {' '}
            We understand that every space is unique, and so are your
            preferences. That's why we offer a range of customization options,
            allowing you to tailor our designs to suit your individual style and
            requirements.
          </p>
        </div>
        <div className='col-sm'>
          <h4 className='text-center'>Quality Materials</h4>{' '}
          <p>
            {' '}
            Our commitment to excellence extends to the materials we use. We
            source the finest quality Teak wood and epoxy resin, ensuring that
            each product is not only visually stunning but also built to last.
          </p>
        </div>
        <div className='col-sm'>
          <h4 className='text-center'>Timeless Design</h4>{' '}
          <p>
            Trends come and go, but timeless design endures. At Darkforest
            Designs, we create pieces that transcend fleeting fashions, making
            them enduring additions to your home or workspace.
          </p>
        </div>
      </div>
      {/* <div className="features__container__items grid">
        {featuresData.map((item) => (
          <div key={item.id} className="features__container__items__item">
            <span>{item.img}</span>
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
          </div>
        ))}
      </div> */}
    </div>
  </div>
)

export default OurFeatures
