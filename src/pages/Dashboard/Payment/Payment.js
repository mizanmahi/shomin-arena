import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { useParams } from 'react-router';
import { axiosInstance } from '../../../helpers/axiosInstance';

const stripePromise = loadStripe(
   'pk_test_51IlBXWCqR1lQkbhnoQ7hsZPvwGPskZgMZSlsayRPnTozjLXhwbrhFLf74ILsXJrxoshlxoBJscvlPp20cIAU7s6300wfZlJCkZ'
);

const Payment = () => {
   const { orderId } = useParams();
   const [order, setOrder] = useState();

   useEffect(() => {
      axiosInstance.get(`/orders/${orderId}`).then(({ data }) => {
         setOrder(data);
      });
   }, [orderId]);

   return (
      <div>
         {order && (
            <Elements stripe={stripePromise}>
               <CheckoutForm order={order} />
            </Elements>
         )}
      </div>
   );
};

export default Payment;

/* 
=================================
      React Stripe steps

? Stripe payment integrated with react
1. npm install --save @stripe/stripe-js
2. npm install --save @stripe/react-stripe-js
3. Setting publishable key (From stipes api doc)
4. Elements
5. Checkout form
6. using two hooks => useElements() and useStripe()

7. creating payment method

8. Collecting payment
*/
