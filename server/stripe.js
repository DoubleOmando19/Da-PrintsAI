import { products } from "../data/products"

const button = document.querySelector("button")
button.addEventListener("click", () => {
  console.log("Checkout")
  fetch("/create-checkout-session", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      items: products
    })
  }).then(res => {
    if (res.ok) return res.json()
    return res.json().then(json => Promise.reject(json))
  }).then(({ url }) => {
    window.location = url
  }).catch(e => {
    console.error(e.error)
  })
})