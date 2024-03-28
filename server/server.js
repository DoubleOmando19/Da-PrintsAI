require('dotenv').config()

const express = require('express')
const { products } = require('../data/products')

const app = express()

const cors = require('cors')

app.use(express.json())

app.use(cors({
  origin: "http://localhost:5500",
}))


const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const storeItems = products.json

app.post('/create-checkout-session', async (req, res) => {

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.items.map(item => {
        const storeItems = storeItems.get(item.id)
        return {
          price_data: {
            currency: 'cad',
            product_data: {
              name: storeItems.name
            },
            unit_amount: storeItems.priceInCents
          },
          quantity: item.quantity
        }
      }),
      success_url: `${process.env.CLIENT_URL}/success.html`,
      cancel_url: `${process.env.CLIENT_URL}/cancel.html`
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
  res.json({ url: 'hi' })
})

app.listen(3000)

