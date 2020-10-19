import { Controller, Get, Body, Post } from '@nestjs/common';

@Controller('stripe')
export class StripeController {
@Post()
async testStripe(@Body() data: any){
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // const paymentIntent = await stripe.paymentIntents.create({
    //     amount: 1000,
    //     currency: 'usd',
    //     payment_method_types: ['card'],
    //     receipt_email: 'rizwan.walayat@phaedrasolutions.com',
    // });
    const stripeToken = data.stripeToken;
    const priceInPence = data.totalAmount * 100;

    const payment = await stripe.charges.create({
        amount: priceInPence, // in cents,
        currency: 'usd',
        source: stripeToken,
        description: 'Any description about the payment',
        metadata:{
            // key: value // any meta-data you want to store
        }
    }, (err, charge) => {
        if(err) {
           console.log(err);
        } else {
           console.log(charge);
        }
    })
    console.log('payment', payment);
}
}
