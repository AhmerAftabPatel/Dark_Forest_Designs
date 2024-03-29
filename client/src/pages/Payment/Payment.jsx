import React, { useEffect, useRef, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useToasts } from "react-toast-notifications";
import SecureImageStripe from '../../assets/images/secure-stripe.png'
import { BsCreditCard, BsCalendar2Event, BsFillKeyFill } from "react-icons/bs";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { clearErrors, createOrder } from "../../redux/actions/orderActions";
import { Helmet } from "react-helmet";

import { Spinner } from "react-bootstrap";
import { BASE_URL } from "../../config";

const CheckoutForm = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMesssage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  // const auth = useSelector((state) => state.userLogin?.userInfo);
  // const { user } = auth;

  // const token = useSelector((state) => state.userLogin?.userInfo?.access_token);

  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo?.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      setIsLoading(true);
      const config = {
        // headers: {
        //   "Content-Type": "application/json",
        //   Authorization: token,
        // },
      };
      const { data } = await axios.post(
        `${BASE_URL}/api/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(String(client_secret), {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: shippingInfo.name,
            email: shippingInfo.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        console.log(result.error)
        payBtn.current.disabled = false;
        setErrorMessage(result?.error);
        setSuccessMesssage("");
        setIsLoading(false);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          setSuccessMesssage("Payment succssfully done.");
          setErrorMessage("");
          setIsLoading(false);
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order, "", navigate));

          // setErrorMessage

          await axios.post(
            `${BASE_URL}/api/user/success`,
            {
              email: shippingInfo.email,
            },
            config
          );
        } else {
          setIsLoading(false);
          setSuccessMesssage("");
          setErrorMessage("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      setSuccessMesssage("");
      setErrorMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  useEffect(() => {
    if (error) {
      addToast(error, { appearance: "error", autoDismiss: true });
      dispatch(clearErrors());
    }
  }, [dispatch, error, addToast]);

  useEffect(() => {
    if (errorMessage) {
      addToast(errorMessage, { appearance: "error", autoDismiss: true });
    } else if (successMessage) {
      addToast(successMessage, {
        appearance: "success",
        autoDismiss: true,
      });
      // navigate(redirect);
    }
  }, [addToast, errorMessage, successMessage]);

  return (
    <div className="payment-checkout">
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Payment</title>
        </Helmet>

        <div className="payment">
          <form className="payment__form" onSubmit={(e) => submitHandler(e)}>
            <h2>Card Info</h2>
            <div>
              <BsCreditCard />
              <CardNumberElement className="payment__form__input" />
            </div>
            <div>
              <BsCalendar2Event />
              <CardExpiryElement className="payment__form__input" />
            </div>
            <div>
              <BsFillKeyFill />
              <CardCvcElement className="payment__form__input" />
            </div>

            <button ref={payBtn} type="submit" className="button">
              {isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                `Pay - Rs.${orderInfo && orderInfo.totalPrice.toFixed(2)}`
              )}
            </button>
            <div style ={{marginTop : "12px"}}>
            <img src={SecureImageStripe}/>
            </div>
            {/* <input
              type="submit"
              value={`Pay - $${orderInfo && orderInfo.totalPrice}`}
              ref={payBtn}
              className="button"
            /> */}
          </form>
        </div>
      </>
    </div>
  );
};

const stripePromise = loadStripe('pk_live_51NrUDbSB18fKjwjxgM5dIPZudKsbsbxGcLTi52UAkz8Lr44c2nU1ZUC3KNkgVqsLZwMZpvqMjmFBl8GQqiNfZmiK00gGFEM6Zd');
// const stripePromise = loadStripe('pk_test_51NBSFhSBz2WGV9rAlhMp1qvuWtUdZmxz2oIErGwtox3XDPJyeXZJBORbao3fOAcPQVzdf3oqhotvPm5InNprTsgD00mQ3DQNFV');

const Payment = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Payment;
