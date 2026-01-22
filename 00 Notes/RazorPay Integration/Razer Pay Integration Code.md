Below is a **complete, minimal, production-style Razorpay integration** using **Node.js + Express + EJS** for a **simple dynamic payment page**.

This setup matches what is typically shown in the videos you watched and is **interview-ready**.

---

# ✅ Features Covered

* Node.js + Express server
* EJS dynamic payment page
* Razorpay order creation
* Razorpay checkout popup
* Secure payment verification (HMAC)
* Clean folder structure
* Test-mode ready

---

## 📁 Project Structure

```
razorpay-ejs-payment/
│
├── views/
│   └── index.ejs
│
├── .env
├── app.js
├── package.json
```

---

## 1️⃣ Install Dependencies

```bash
npm init -y
npm install express razorpay dotenv ejs crypto
```

---

## 2️⃣ `.env` File

```env
PORT=3000
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxx
```

⚠️ Never push this file to GitHub.

---

## 3️⃣ `app.js` (Complete Backend Code)

```js
require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View Engine
app.set("view engine", "ejs");

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Home Page
app.get("/", (req, res) => {
  res.render("index", {
    key_id: process.env.RAZORPAY_KEY_ID,
  });
});

// Create Order
app.post("/create-order", async (req, res) => {
  try {
    const amount = req.body.amount;

    const options = {
      amount: amount * 100, // INR → Paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify Payment
app.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const hmac = crypto.createHmac(
    "sha256",
    process.env.RAZORPAY_KEY_SECRET
  );

  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generatedSignature = hmac.digest("hex");

  if (generatedSignature === razorpay_signature) {
    res.send("Payment Successful & Verified");
  } else {
    res.status(400).send("Payment Verification Failed");
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---

## 4️⃣ `views/index.ejs` (Dynamic Payment Page)

```html
<!DOCTYPE html>
<html>
<head>
  <title>Razorpay Payment</title>
</head>
<body>
  <h2>Pay with Razorpay</h2>

  <form id="payment-form">
    <input type="number" id="amount" placeholder="Enter Amount (INR)" required />
    <button type="submit">Pay Now</button>
  </form>

  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

  <script>
    document.getElementById("payment-form").addEventListener("submit", async function (e) {
      e.preventDefault();

      const amount = document.getElementById("amount").value;

      // Create order
      const orderResponse = await fetch("/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const order = await orderResponse.json();

      const options = {
        key: "<%= key_id %>",
        amount: order.amount,
        currency: "INR",
        name: "Demo Company",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response) {
          const verifyResponse = await fetch("/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const result = await verifyResponse.text();
          alert(result);
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    });
  </script>
</body>
</html>
```

---

## 5️⃣ Run the Project

```bash
node app.js
```

Open in browser:

```
http://localhost:3000
```

---

## 6️⃣ Razorpay Test Credentials

Use Razorpay **Test Mode**:

* Card: `4111 1111 1111 1111`
* Expiry: Any future date
* CVV: `123`
* OTP: `123456`

---

## 🔑 Interview-Ready Key Points

* **Order must be created on backend**
* **Amount is always in paise**
* **Payment verification must be server-side**
* **Never expose secret key**
* **Frontend only opens checkout**

---

## 🚀 Next Enhancements (Optional)

* Save payment data in MongoDB
* Add Razorpay Webhooks
* Add success/failure pages
* Add user authentication
* Switch to Live Mode

---

If you want, I can:

* Convert this into **MVC structure**
* Add **MongoDB payment storage**
* Add **Webhook handling**
* Explain **each line for interviews**

Just tell me.
