import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';

function App() {

  const [product, setproduct] = useState({
    name: 'Mario 64',
    price: 10,
    product: 'Nintendo'
  });

  const makePayment = async token => {
    const body = {
      token,
      product
    }
    const headers = {
      'Contnet-Type': 'application/json'
    }
    try {
      let response = await fetch(`http://localhost:5000/payment`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });
      console.log('RESPONSE', response);
      const { status } = response;
      console.log("STATUS", status);
    }
    catch (err) {
      return console.log(err);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout stripeKey='pk_test_lOdDQfzqfyxcLovxwkLgniBU' token={makePayment} name='Buy Mario 64' amount={product.price * 100}>
          <button className='waves-effect waves-light btn-large pink accent-3'>{product.name} - ${product.price}</button> 
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
