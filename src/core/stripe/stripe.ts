// import * as Stripe from 'stripe';
const Stripe = require('stripe')
export const stripe = Stripe('sk_test_51HaGr0HMX2JbIG2JGnUO7pZgeJBEcTxB1oqpgNrrIfDeOHmogxmAJ3eaCd8ht7NDR2Q5G8EC8vak2cDbzX6k27Dd001OSBtlQj');

// const stripe = require('stripe')('sk_test_51HaGr0HMX2JbIG2JGnUO7pZgeJBEcTxB1oqpgNrrIfDeOHmogxmAJ3eaCd8ht7NDR2Q5G8EC8vak2cDbzX6k27Dd001OSBtlQj');
// const paymentIntent =  stripe.paymentIntents.create({
//     amount: 1000,
//     currency: 'usd',
//     payment_method_types: ['card'],
//     receipt_email: 'rizwan.walayat@phaedrasolutions.com',
//   });