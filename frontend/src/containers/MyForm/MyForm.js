// MyForm.jsx
import { useStripe } from '../../HOC/useStripe/StripeHookProvider';
import React, {useState, useRef, useEffect} from 'react';
import {Form, Button} from 'semantic-ui-react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from 'react-stripe-elements';
import useRequest1API from '../../HOC/API/useRequest1';


const MyForm = (props) => {

  // const userPay = useRef(null);
  const amountEl = useRef(null);

  const initParams = {"params": {"cost": "5.00", "currency": "USD"}};
  const [postQuery, setPostQuery] = useState(initParams);
  const [PAYMENT_INTENT_CLIENT_SECRET] = useRequest1API(postQuery, "application", "post");
  const stripe = useStripe();


  
  const handleSubmit = async (e) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    e.preventDefault();
  
    // Use Elements to get a reference to the Card Element mounted somewhere
    // in your <Elements> tree. Elements will know how to find your Card Element
    // because only one is allowed.
    // See our getElement documentation for more:
    // https://stripe.com/docs/stripe-js/reference#elements-get-element
    let { token } = await stripe.createToken();
    console.log(token.id);
    console.log();
    setPostQuery({"params": {
                        amount: amountEl.current.value,
                        tokobj: token,
                        tok: token.id,
                        receipt_email: 'evanontario009@gmail.com'}});

    console.log(PAYMENT_INTENT_CLIENT_SECRET.status === 200);
    
    };
  return (
    <div className="checkout-form">
      <form onSubmit={handleSubmit.bind(this)}>
        <label>
          Amount in Cents:
          <input ref={amountEl}/>
        </label><br />
        <label>
          Card details
          <CardNumberElement />
        </label>
        <label>
          Expiration date
          <CardExpiryElement />
        </label>
        <label>
          CVC
          <CardCVCElement />
        </label>
        <button type="submit" className="order-button">
          Pay
        </button>
      </form>
    </div>
  );
};

export default injectStripe(MyForm);