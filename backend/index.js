const cors = require('cors');
const express = require('express');
const stripe = require('stripe')('sk_test_egiiH17xRt4QTerkgBqpwoqm');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('IT WORKS')
});

app.post('/payment', (req, res) => {
    const {product, token} =req.body;
    console.log('PRODUCT', product);
    console.log('PRICE', product.price);
    const idempontencyKey = uuidv4();

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase of ${product.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    postal_code: token.card.address_postal_code,
                    city: token.card.address_city,
                    state: token.card.address_state
                }
            }
        }, {idempontencyKey})
    }).then(result => res.status(200).json(result))
    .catch(err => console.log.err);
});

app.listen(5000, () => console.log('LISTENING AT PORT 5000'));