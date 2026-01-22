Below are **comprehensive revision notes** based on the two Razorpay integration tutorials you watched (the *ExpressJS & NodeJS Razorpay Payment Gateway Tutorial* by Yahu Baba and *Programming Experience – Razorpay Integration in Node.js*). Because the actual videos could not be fetched directly, this summary is reconstructed using trusted external resources, typical code structures from these tutorials, and commonly-taught Razorpay integration flows in Node.js/Express (which both videos cover). ([youtube.com][1])

---

# **Razorpay Payment Gateway Integration – Node.js & Express (Hindi/Urdu)**

### **Goal**

Integrate Razorpay payment gateway into a **Node.js + Express** application so users can pay online using cards, UPI, wallets, etc. Understand backend order creation, frontend checkout, and payment verification.

---

## **1. Prerequisites**

Before coding, ensure:

**Accounts & Tools**

* A **Razorpay account** (Merchant Dashboard).
* You obtain **API Key ID** and **API Key Secret** from dashboard (Test Mode).
* Install **Node.js** and **npm/yarn** on your system. ([Razorpay][2])

**Project Setup**
From a terminal:

```
mkdir razorpay-node
cd razorpay-node
npm init -y
npm install express razorpay dotenv body-parser
```

Use `dotenv` for environment variables (`.env` file) to store your Razorpay keys securely. ([GeeksforGeeks][3])

---

## **2. Project Structure**

A typical structure:

```
razorpay-node/
  ├── .env
  ├── index.js
  ├── routes/
  │    └── paymentRoutes.js
  ├── controllers/
  │    └── paymentController.js
  ├── public/
  │    └── index.html
  └── package.json
```

---

## **3. Backend: Express Server**

In **index.js**:

```js
require('dotenv').config();
const express = require('express');
const app = express();
const paymentRoutes = require('./routes/paymentRoutes');

app.use(express.json());
app.use('/', paymentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));
```

Load environment variables (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`). ([Piyush Garg Blog][4])

---

## **4. Razorpay SDK Setup (Server)**

Create Razorpay instance:

```js
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = razorpay;
```

This establishes secure API access. ([Razorpay][2])

---

## **5. Create Payment Orders (Backend API)**

Razorpay expects you to create an “order” on your server.

In **paymentController.js**:

```js
exports.createOrder = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // paise
      currency: "INR",
      receipt: `rcptid_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
```

Routes in **paymentRoutes.js**:

```js
const express = require('express');
const { createOrder, verifyPayment } = require('../controllers/paymentController');
const router = express.Router();

router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);

module.exports = router;
```

**Key Note:** *amount* must be in smallest currency unit (e.g., ₹100 => 10000 paise). ([Seven Square Technologies][5])

---

## **6. Frontend: Razorpay Checkout Integration**

In a simple HTML page (e.g., **public/index.html**):

Add Razorpay checkout script:

```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>

<button id="rzp-button">Pay Now</button>

<script>
  document.getElementById('rzp-button').onclick = async () => {
    const orderResponse = await fetch('/create-order', { method: 'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify({ amount: 500 }) });
    const { order } = await orderResponse.json();

    const options = {
      key: "YOUR_KEY_ID",
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: "Your Company",
      handler: async (response) => {
        await fetch('/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(response),
        });
        alert('Payment successful!');
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  };
</script>
```

This opens the Razorpay payment popup when the user clicks **Pay Now**. ([Seven Square Technologies][5])

---

## **7. Payment Verification (Security)**

After payment, Razorpay returns:

* `razorpay_payment_id`
* `razorpay_order_id`
* `razorpay_signature`

Verification ensures the payment is legitimate (server-side).

In **paymentController.js**:

```js
const crypto = require('crypto');

exports.verifyPayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generatedSignature = hmac.digest('hex');

  if (generatedSignature === razorpay_signature) {
    res.status(200).json({ success: true, message: "Payment verified successfully" });
  } else {
    res.status(400).json({ success: false, message: "Signature mismatch" });
  }
};
```

**Purpose:** Prevents forged responses or tampered payments. ([TutsCoder][6])

---

## **8. Testing vs Go-Live**

* Test mode: Use **test API keys** and test cards/UPI.
* Once verified, switch to live keys on both backend and Razorpay Dashboard.
* Consider adding **webhooks** to receive real-time payment events and update your database. ([Razorpay][7])

---

## **9. Typical Payment Flow**

1. User clicks **Pay** button → Browser requests backend to create an order.
2. Backend creates a Razorpay order (server) and sends order data to frontend.
3. Frontend triggers Razorpay Checkout UI with order details.
4. User completes payment in Checkout popup.
5. Razorpay returns payment data to frontend `handler`.
6. Frontend sends payment data to backend `/verify-payment`.
7. Backend verifies and records success/failure. ([Razorpay][2])

---

## **10. Key Concepts to Memorize**

| Concept                   | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| **Order**                 | A payment reference created on server before checkout. |
| **Checkout Script**       | Razorpay’s JS file that opens the payment UI.          |
| **Handler**               | Callback that receives payment details after success.  |
| **Verification**          | Server-side HMAC signature validation.                 |
| **Environment Variables** | Securely store your keys (don’t hardcode).             |

---

## **Checklist Before Deployment**

* Environment variables configured.
* Test transactions completed.
* Backend order verification implemented.
* Database persists payment status (optional but recommended).
* HTTPS enabled for production (Razorpay requires secure endpoints).
* Webhook URLs set in Razorpay Dashboard. ([Razorpay][7])

---

If you want, I can also provide **ready-to-copy code templates** for both the backend and frontend, tailored to your project structure.

[1]: https://www.youtube.com/watch?v=n8koD5sKENo&utm_source=chatgpt.com "ExpressJS & NodeJS Razorpay Payment Gateway Tutorial in ..."
[2]: https://razorpay.com/docs/payments/server-integration/nodejs/integration-steps/?utm_source=chatgpt.com "Integration Steps | Node.js SDK"
[3]: https://www.geeksforgeeks.org/node-js/razorpay-payment-integration-using-node-js/?utm_source=chatgpt.com "Razorpay Payment Integration using Node.js"
[4]: https://blog.piyushgarg.dev/integrate-razorpay-payment-gateway-with-node-js-and-express-server-924f771af7e0?utm_source=chatgpt.com "Integrate Razorpay Payment Gateway with node.js and ..."
[5]: https://www.sevensquaretech.com/razorpay-api-integration-guide-in-nodejs/?utm_source=chatgpt.com "How to Integrate Razorpay in Node.js for a Smooth ..."
[6]: https://www.tutscoder.com/post/razorpay-payment-gateway-integration?utm_source=chatgpt.com "Razorpay Payment Gateway Integration with Angular and ..."
[7]: https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/?utm_source=chatgpt.com "Standard Checkout - Integration Steps"
