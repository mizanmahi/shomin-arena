import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import Spinner from '../../../components/Spinner/Spinner';
import { axiosInstance } from '../../../helpers/axiosInstance';
import { useAuth } from '../../../hooks/useAuth';

const CheckoutForm = ({ order }) => {
   const stripe = useStripe();
   const elements = useElements();
   const [error, setError] = useState('');
   const [clientSecret, setClientSecret] = useState('');
   const {user} = useAuth();
   const [success, setSuccess] = useState('');
   const [processing, setProcessing] = useState(false);

   useEffect(() => {
      axiosInstance
         .post('/create-payment-intent', {
            customerName: order?.userName,
            price: order?.orderItem.discountedPrice,
         })
         .then(({ data }) => {
            console.log(data);
            setClientSecret(data.clientSecret);
         });
   }, [order?.orderItem.discountedPrice, order?.userName]);

   const handleSubmit = async (event) => {
      // Block native form submission.
      event.preventDefault();
      setProcessing(true);
      if (!stripe || !elements) {
         // Stripe.js has not loaded yet. Make sure to disable
         // form submission until Stripe.js has loaded.
         return;
      }

      const card = elements.getElement(CardElement);
      if (!card) return;

      const { error: err, paymentMethod } = await stripe.createPaymentMethod({
         type: 'card',
         card,
      });

      if(err){
         setError(err.message);
         setProcessing(false);
         setSuccess('');
      }else{
         console.log(paymentMethod);
         setError('')
      }

      // payment intent
      const {paymentIntent, error} = await stripe.confirmCardPayment(
         clientSecret,
         {
           payment_method: {
             card,
             billing_details: {
               name: order?.userName,
               email: user.email,
              
             },
           },
         },
       );

       if(error){
          setError(error.message);
         setProcessing(false);
          setSuccess('')
       }else {
         setSuccess('Payment successfully completed!')
          console.log(paymentIntent);
         setProcessing(false);
       }
   };

   return (
      <Box>
         <Typography sx={{textAlign: 'center'}} variant='h5'>
            Pay for {order?.orderItem.name}
         </Typography>
         <form onSubmit={handleSubmit}>
            <CardElement
               options={{
                  style: {
                     base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                           color: '#aab7c4',
                        },
                     },
                     invalid: {
                        color: '#9e2146',
                     },
                  },
               }}
            />
            {processing ? <Spinner /> :<Button
               type='submit'
               variant='contained'
               sx={{ mt: 5 }}
               disabled={!stripe}
            >
               Pay ${order?.orderItem?.discountedPrice}
            </Button>}
            <Typography sx={{ textAlign: 'center', mt: 1 }}>
               {error && (
                  <span
                     style={{
                        background: '#9e2146',
                        padding: '.5rem',
                        color: '#f3dfdf',
                        borderRadius: '1rem',
                     }}
                  >
                     {error}
                  </span>
               )}
            </Typography>
            <Typography sx={{ textAlign: 'center', mt: 1 }}>
               {success && (
                  <span
                     style={{
                        background: 'green',
                        padding: '.5rem',
                        color: '#ffffff',
                        borderRadius: '1rem',
                     }}
                  >
                     {success}
                  </span>
               )}
            </Typography>
         </form>
      </Box>
   );
};

export default CheckoutForm;
