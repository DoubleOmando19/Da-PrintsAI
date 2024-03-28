require('dotenv').config()

const express = require('express')
const { products } = require('../data/products')

const app = express()

const cors = require('cors')

app.use(express.json())

app.use(cors({
  origin: "http://127.0.0.1:5500/data/products",
}))


const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const storeItem = products

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.items.map(item => {
        const storeItem = storeItem.get(item.id)
        return {
          price_data: {
            currency: 'cad',
            product_data: {
              name: storeItem.name
            },
            unit_amount: storeItem.priceInCents
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

app.listen(5500)

