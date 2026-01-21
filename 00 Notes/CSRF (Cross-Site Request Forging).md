## What is CSRF (Cross-Site Request Forgery)

**CSRF** is a web security vulnerability where a **malicious website tricks a logged-in user’s browser into sending an unintended request to another trusted website** (your application).

The key problem is that **the browser automatically includes credentials** (cookies, session IDs) with every request to your domain—whether the request was initiated by your site or not.

---

## Why CSRF Is Dangerous

The server:

* Sees a valid session cookie
* Assumes the request is legitimate
* Executes the action **without the user’s consent**

This can result in:

* Password changes
* Money transfers
* Email changes
* Account deletion

All **without the user knowing**

---

## Simple Real-World Example

### Scenario

1. User logs into `bank.com`
2. Session cookie is stored in the browser
3. User visits `evil.com`

### Malicious HTML on `evil.com`

```html
<form action="https://bank.com/transfer" method="POST">
  <input type="hidden" name="amount" value="10000">
  <input type="hidden" name="to" value="attacker">
</form>

<script>
  document.forms[0].submit();
</script>
```

### What Happens

* Browser sends request to `bank.com`
* Cookie is automatically attached
* Server thinks **“user is authenticated”**
* Money is transferred

❌ The user never clicked anything on `bank.com`

---

## Core Reason CSRF Exists

CSRF exists because:

1. Browsers **automatically send cookies**
2. Servers **trust cookies alone**
3. Requests can be triggered **cross-origin**

---

## CSRF vs XSS (Important Difference)

| Aspect              | CSRF             | XSS                 |
| ------------------- | ---------------- | ------------------- |
| Attack origin       | Another website  | Your own website    |
| Exploits            | Trust in cookies | Trust in user input |
| Needs JS injection? | ❌ No             | ✅ Yes               |
| Target              | Server actions   | User session & data |

---

## How CSRF Protection Works

### Core Idea

> “Prove that the request actually came from **my frontend**, not a random site.”

This is done using a **CSRF token**.

---

## CSRF Token Flow (Your App’s Flow)

1. Server generates a **random token**
2. Token is sent to frontend
3. Frontend sends token back with every state-changing request
4. Server verifies token before processing request

If token is missing or invalid → ❌ request rejected

---

## Why Cookies Alone Are Not Enough

Cookies:

* Are sent automatically
* Cannot distinguish *who initiated the request*

CSRF tokens:

* Must be **explicitly added by JavaScript**
* Cannot be read or forged by another site

---

## CSRF in Your Code (What You Implemented)

```js
const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: false
  }
});
```

### Meaning

* Token is stored in a cookie
* Cookie cannot be accessed by JavaScript (`httpOnly`)
* Browser blocks cross-site sending (`sameSite=lax`)

You also exposed:

```js
GET /api/csrf-token
```

So your frontend can fetch and attach the token.

---

## How Frontend Uses the Token

Example with `fetch`:

```js
fetch("/api/protected", {
  method: "POST",
  headers: {
    "X-CSRF-Token": csrfToken
  },
  credentials: "include"
});
```

---

## Why CSRF Mainly Affects Cookie-Based Auth

| Auth Type                   | CSRF Risk |
| --------------------------- | --------- |
| Session cookies             | ✅ High    |
| JWT in cookies              | ✅ High    |
| JWT in Authorization header | ❌ No      |
| OAuth tokens in headers     | ❌ No      |

If the token is **manually attached**, CSRF is not possible.

---

## Common CSRF Defenses (Industry Standard)

1. **CSRF tokens** (most secure)
2. `SameSite` cookies (`lax` or `strict`)
3. Double-submit cookies
4. Checking `Origin` / `Referer` headers (secondary)
5. Avoiding cookies for APIs (use Authorization headers)

---

## Summary

* CSRF tricks a browser into making authenticated requests
* Happens because cookies are sent automatically
* Attacker never needs user credentials
* CSRF tokens prove request origin
* Your app is **correctly protected** using `csurf`

---

If you want, I can next explain:

* CSRF vs JWT-based authentication
* Why SameSite alone is not sufficient
* How CSRF protection works with React
* How CSRF behaves behind a load balancer

Tell me what you want to go deeper into.
