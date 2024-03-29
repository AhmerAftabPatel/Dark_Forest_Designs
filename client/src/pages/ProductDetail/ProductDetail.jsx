import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { AiFillHeart, AiFillStar, AiOutlineHeart } from 'react-icons/ai'
import { Spinner } from 'react-bootstrap'
import moment from 'moment'
import Carousel from 'react-bootstrap/Carousel'
import { useToasts } from 'react-toast-notifications'
import DeliveryImage from '../../assets/images/Delivery (1).png';
import HandmadeImage from '../../assets/images/handmade.png';
import {
  getAllProduct,
  getProductById,
  newReview
} from '../../redux/actions/productActions'
import { addItemsToCart } from '../../redux/actions/cartActions'
import ReactStars from 'react-rating-stars-component'

import { Footer, ProductRating } from '../../components'
import { FiShoppingCart } from 'react-icons/fi'
import SingleProduct from '../../components/common/Products/SingleProduct/SingleProduct'
import { Helmet } from 'react-helmet'
import { addItemsToWishlist } from '../../redux/actions/wishlistActions'
import { clearErrors } from '../../redux/actions/orderActions'
import { NEW_REVIEW_RESET } from '../../redux/constants/productConstants'
import axios from 'axios'
import { BASE_URL } from '../../config'
const ProductDetail = () => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  // const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('')
  const [images, setImages] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [uploadSuccess, setUploadSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { productId } = useParams()
  const dispatch = useDispatch()
  const { product, loading, error } = useSelector(state => state.productById)

  console.log(product)

  const user = useSelector(state => state.userLogin)
  const { userInfo } = user
  const { cartItems } = useSelector(state => state.cart)

  const addOrNot = cartItems?.find(item => item.product === product._id)

  const { addToast } = useToasts()

  const productsData = useSelector(state => state.allProducts)

  const {
    success,
    error: reviewError,
    message,
    loading: reviewLoading
  } = useSelector(state => state.newReview)

  const {
    products,
    loading: productsLoading,
    error: productsError
  } = productsData

  useEffect(() => {
    dispatch(getAllProduct())
  }, [dispatch])

  useEffect(() => {
    dispatch(getProductById(productId))
  }, [productId, dispatch])

  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return

    const qty = quantity + 1
    setQuantity(qty)
  }

  const decreaseQuantity = () => {
    if (1 >= quantity) return

    const qty = quantity - 1
    setQuantity(qty)
  }

  const addToCartHandler = () => {
    dispatch(addItemsToCart(productId, quantity, addToast))
  }

  const { wishlistItems } = useSelector(state => state.wishlist)

  const addWishlistOrNot = wishlistItems?.find(
    item => item.product === productId
  )

  const addToWishlistHandler = () => {
    dispatch(addItemsToWishlist(productId, 1, addToast))
  }

  const ratingChanged = newRating => {
    setRating(newRating)
  }

  const handleUpload = async e => {
    const files = e.target.files
    if (files.length > 4) {
      return alert('More than 4 photos are not allowed!')
    } else {
      try {
        let formData = new FormData()
        for (const file of files) {
          formData.append('file', file, file.name)
        }
        const res = await axios.post(`${BASE_URL}/api/upload_image`, formData, {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: userInfo?.access_token
          }
        })
        setIsLoading(false)
        setImages(res.data)
        setUploadSuccess(res.data.message)
      } catch (error) {
        setUploadSuccess('')
        setIsLoading(false)
        setUploadError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      }
    }
  }

  // delete image
  const handleDestroy = async public_id => {
    try {
      setIsLoading(true)
      setUploadError('')
      let imageId = images.find(
        image => image.public_id === public_id
      ).public_id
      const res = await axios.post(
        `${BASE_URL}/api/destroy`,
        { public_id: imageId },
        {
          headers: { Authorization: userInfo?.access_token }
        }
      )
      setIsLoading(false)
      setImages(false)
      setUploadSuccess(res.data.message)
    } catch (error) {
      setIsLoading(false)
      setUploadSuccess('')
      setUploadError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    }
  }

  const handleSubmit = e => {
    e.preventDefault()

    dispatch(
      newReview({
        rating,
        comment,
        title,
        name: userInfo?.user?.name,
        avatar: userInfo?.user?.avatar,
        images,
        productId
      })
    )

    e.target.reset()
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (error) {
      addToast(error, { appearance: 'error', autoDismiss: true })
      dispatch(clearErrors())
    }

    if (reviewError) {
      addToast(reviewError, { appearance: 'error', autoDismiss: true })
      dispatch(clearErrors())
    }

    if (success) {
      addToast(success, {
        appearance: 'success',
        autoDismiss: true
      })
      dispatch({ type: NEW_REVIEW_RESET })
    }
    dispatch(getProductById(productId))
  }, [dispatch, productId, error, reviewError, success, addToast, message])

  return (
    <>
      <section className='container-div section product'>
        <Helmet>
          <meta charSet='utf-8' />
          <title>Product - Detail</title>
        </Helmet>
        {loading ? (
          <Spinner
            style={{ marginLeft: '50%', marginTop: '5%' }}
            animation='border'
            role='status'
          >
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        ) : error ? (
          <h2 style={{ color: '#333', fontWeight: '500', textAlign: 'center' }}>
            {error}
          </h2>
        ) : (
          <div className='product__detail grid'>
            <div className='product__detail__img'>
              <Carousel variant='dark'>
                {product?.media?.map(image => {
                  return (
                    <Carousel.Item>
                      <img
                        // className="d-block w-100"
                        src={image.url}
                        // alt="First slide"
                      />
                    </Carousel.Item>
                  )
                })}
              </Carousel>
              {/* <img src={product?.images?.url} alt="" /> */}
            </div>

            <div className='product__detail__info'>
              <h2 className='product__detail__info-name'>{product.name}</h2>

              <div className='product__detial__info__price'>
                <span className='product__detail__info__price-count'>
                  Rs. {product.price}
                </span>
              </div>
              <div className='product__detail__info-rating'>
                <ProductRating ratingValue={product.ratings} /> (
                {product.numOfReviews} Reviews)
              </div>

              <div className='product__detail__info-stock'>
                <p style={{ fontWeight: '600' }}>
                  Status:{' '}
                  {product?.Stock && product?.Stock > 0
                    ? 'In Stock'
                    : 'Out of Stock'}
                </p>
              </div>
              {product?.size && <div className='product__detail__info-stock'>
                <p style={{ fontWeight: '600' }}>
                  Size: {' '}
                  {product?.size && product?.size}
                </p>
              </div>}
              <div className='product__detail__info__buttons'>
                <div className='product__detail__info__buttons-quantity'>
                  <button onClick={decreaseQuantity} className='minus'>
                    -
                  </button>
                  <input
                    className='input'
                    readOnly
                    type='number'
                    value={quantity}
                  />
                  <button onClick={increaseQuantity} className='add'>
                    +
                  </button>
                </div>
                <div className='product__detail__info__buttons-add'>
                  {product?.Stock && product?.Stock > 0 ? (
                    <button
                      disabled={addOrNot?.quantity > 0}
                      onClick={addToCartHandler}
                    >
                      <FiShoppingCart style={{ marginRight: '.5rem' }} />
                      {addOrNot?.quantity > 0 ? 'Added' : 'Buy Now'}
                    </button>
                  ) : (
                    <button disabled>Out of Stock</button>
                  )}
                </div>
                <div className='product__detail__info__buttons-wishlist'>
                  <button
                    disabled={addWishlistOrNot?.quantity > 0}
                    onClick={addToWishlistHandler}
                    title={
                      addWishlistOrNot?.quantity > 0
                        ? 'Added to Wishlist'
                        : 'Add to Wishlist'
                    }
                  >
                    {addWishlistOrNot?.quantity > 0 ? (
                      <AiFillHeart style={{ color: 'red' }} />
                    ) : (
                      <AiOutlineHeart />
                    )}
                  </button>
                </div>
              </div>
              <div className='product__detail__info__buttons'>
                <div>
                  <img src={HandmadeImage} width={160}/>
                </div>
                <div>
                  <img src={DeliveryImage} width={160}/>
                </div>
              </div>
              <div className='product__detail__info-desc'>
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        )}

        <div className='product-review-containter'>
          <div className='product-review-left'>
            {product?.reviews && product.reviews[0] ? (
              <div className='reviews'>
                <h2>Ratings & Reviews</h2>
                {product?.reviews &&
                  product.reviews.map((review, index) => (
                    <div className='review-card' key={index}>
                      <div className='review-content'>
                        <div className='review-person'>
                          <img src={review?.avatar} alt='Person' />
                        </div>
                        <div className='review-description'>
                          <div className='left'>
                            <h4>{review.name}</h4>
                            <p>
                              {moment(review?.createdAt).format('MMMM Do YYYY')}
                            </p>
                            <p className='desc'>{review.comment}</p>
                            <div
                              className='left'
                              style={{ display: 'flex', gap: '3px' }}
                            >
                              {review.images
                                ? review?.images &&
                                  review.images.length > 0 &&
                                  review.images.map(image => {
                                    return (
                                      <div>
                                        <img
                                          width={'100'}
                                          src={image ? image.url : ''}
                                          alt=''
                                        />
                                      </div>
                                    )
                                  })
                                : ''}
                            </div>
                          </div>
                          <div className='right'>
                            <ReactStars
                              count={5}
                              value={Number(review?.rating)}
                              edit={false}
                              size={24}
                              isHalf={true}
                              fullIcon={<AiFillStar />}
                              activeColor='#f3b632'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className='noReviews'>No Reviews Yet</p>
            )}
          </div>
          {userInfo?.user ? (
            <form className='product-review-right' onSubmit={handleSubmit}>
              <h2>Add Review</h2>

              <div className='input-wrapper'>
                <label>Title</label>
                <input
                  type='text'
                  onChange={e => setTitle(e.target.value)}
                  placeholder='Enter review title'
                  required
                />
              </div>

              <div className='input-wrapper'>
                <label>Comment</label>
                <textarea
                  onChange={e => setComment(e.target.value)}
                  name='message'
                  cols='20'
                  rows='7'
                  placeholder='Write review'
                  required
                ></textarea>
              </div>

              <div className='input-wrapper'>
                <label>Upload Images</label>
                {/* <label><div></div></label> */}
                <input
                  type='file'
                  name='file'
                  multiple
                  id='file_up'
                  onChange={handleUpload}
                />
              </div>
              {images ? (
                <Carousel variant='dark'>
                  {images &&
                    images.length > 0 &&
                    images.map(image => {
                      return (
                        <Carousel.Item>
                          <img src={image ? image.url : ''} alt='' />
                          <span onClick={() => handleDestroy(image.public_id)}>
                            X
                          </span>
                        </Carousel.Item>
                      )
                    })}
                </Carousel>
              ) : (
                ''
              )}

              <div className='input-wrapper'>
                <label>Rating</label>
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={24}
                  isHalf={true}
                  fullIcon={<AiFillStar />}
                  activeColor='#f3b632'
                />
              </div>

              <button type='submit' className='button-primary review-btn'>
                {reviewLoading ? 'Loading..' : 'Public Review'}
              </button>
            </form>
          ) : (
            <div className='product-review-right'>
              <h2
                style={{
                  fontWeight: '400',
                  fontSize: '16px'
                }}
              >
                Please{' '}
                <Link
                  style={{
                    color: '#f3b632',
                    textDecoration: 'underline'
                  }}
                  to='/login'
                >
                  Login
                </Link>{' '}
                to submit review.
              </h2>
            </div>
          )}
        </div>

        <div className='related-products'>
          <h2>Related Products</h2>
          <div className='featured__products grid'>
            <>
              {productsLoading ? (
                <Spinner
                  style={{ marginLeft: '50%', marginTop: '5%' }}
                  animation='border'
                  role='status'
                >
                  <span className='visually-hidden'>Loading...</span>
                </Spinner>
              ) : productsError ? (
                <h2
                  style={{
                    color: '#333',
                    fontWeight: '500',
                    textAlign: 'center'
                  }}
                >
                  {productsError}
                </h2>
              ) : (
                <>
                  {products &&
                    products?.map(item => {
                      return item.category === product.category ? (
                        <SingleProduct key={item?._id} product={item} />
                      ) : null
                    })}
                </>
              )}
            </>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default ProductDetail
