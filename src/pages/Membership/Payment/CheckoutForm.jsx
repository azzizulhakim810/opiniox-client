import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const CheckoutForm = () => {
  const [error, setError] = useState('')
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if(!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if(card == null) {
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if(error) {
      console.log('Payment error', error);
      setError(error.message);
    }
    else {
      console.log('Payment Method', paymentMethod);
      setError('');
    }
  }

  return (
    <div>
      <form className='bg-white w-6/12 mx-auto px-6 py-5 rounded' onSubmit={handleSubmit}>
      <CardElement 
        options={{
          style: {
            base: {
              fontSize: '20px',
              backgroundColor: '#eaeaea',
             
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
      <button className='mt-3 bg-black text-white rounded px-10 py-[8px]' type="submit" disabled={!stripe}>
        Pay
      </button>
      <p className='text-red-500'>{error}</p>
    </form>
    </div>
  );
};

export default CheckoutForm;