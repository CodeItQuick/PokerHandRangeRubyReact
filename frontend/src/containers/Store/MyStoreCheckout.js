import React from 'react';
import {Elements} from 'react-stripe-elements';

import InjectedCheckoutForm from '../../containers/Store/MyStoreCheckout';

class MyStoreCheckout extends React.Component {
  render() {
    return (
      <Elements>
        <InjectedCheckoutForm />
      </Elements>
    );
  }
}

export default MyStoreCheckout;