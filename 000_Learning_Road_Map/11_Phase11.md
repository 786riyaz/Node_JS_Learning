# PHASE 11: Authentication & Authorization in Node.js

**Level:** Intermediate to Advanced  
**Goal:** Understand how user authentication works, implement secure registration and login systems, manage JWT tokens, protect API routes, and control user permissions using roles and authorization middleware.

## Topics Covered

1. What is Authentication?
2. What is Authorization?
3. Authentication vs Authorization
4. How Authentication Works
5. User Registration
6. User Login
7. Password Hashing
8. Encryption vs Hashing
9. bcrypt and bcryptjs
10. JSON Web Tokens (JWT)
11. JWT Structure
12. Access Tokens
13. Refresh Tokens
14. Token-Based Authentication
15. Session-Based Authentication
16. Cookies
17. HTTP-Only Cookies
18. Secure Cookies
19. Authentication Middleware
20. Protected Routes
21. Role-Based Access Control (RBAC)
22. Permission-Based Authorization
23. Logout Implementation
24. Password Reset
25. Email Verification
26. OAuth 2.0 and Google Login
27. Authentication Security Best Practices
28. Complete Authentication System with Node.js and Express
29. Interview Questions

---

# 1. What is Authentication?

Authentication is the process of verifying the identity of a user or system.

In simple words:

**Authentication answers the question: Who are you?**

Suppose you have an application where users can log in.

A user enters:

```text
Email: john@example.com
Password: ********
```

The backend checks whether the provided credentials belong to a registered user.

If the credentials are valid, the user is authenticated.

### Real-World Examples

- Logging into Gmail.
- Logging into Facebook.
- Logging into an online banking application.
- Logging into an admin dashboard.
- Logging into an e-commerce website.

### Authentication Flow

```text
          USER
            |
            v
       ENTER EMAIL
       AND PASSWORD
            |
            v
       NODE.JS SERVER
            |
            v
       VERIFY CREDENTIALS
            |
       +----+----+
       |         |
       v         v
    INVALID    VALID
       |         |
       v         v
    REJECT    AUTHENTICATE
                 |
                 v
             LOGIN SUCCESS
```

---

# 2. What is Authorization?

Authorization is the process of determining what an authenticated user is allowed to access or perform.

In simple words:

**Authorization answers the question: What are you allowed to do?**

Suppose an application has three types of users:

1. Admin.
2. Manager.
3. Normal User.

Their permissions may be different.

| Feature | Admin | Manager | User |
|---|---|---|---|
| View Users | Yes | Yes | No |
| Create Users | Yes | No | No |
| Delete Users | Yes | No | No |
| View Products | Yes | Yes | Yes |
| Purchase Products | Yes | Yes | Yes |
| Manage Orders | Yes | Yes | No |

Even after successful login, a normal user should not be allowed to delete other users.

That is authorization.

### Authorization Flow

```text
          USER
            |
            v
       AUTHENTICATION
            |
            v
       USER VERIFIED
            |
            v
       CHECK PERMISSIONS
            |
       +----+----+
       |         |
       v         v
    ALLOWED    DENIED
       |         |
       v         v
    ACCESS     403
    RESOURCE   FORBIDDEN
```

---

# 3. Authentication vs Authorization

This is one of the most important interview questions.

| Authentication | Authorization |
|---|---|
| Verifies user identity | Checks user permissions |
| Answers: Who are you? | Answers: What can you access? |
| Happens before authorization | Happens after authentication |
| Uses passwords, tokens, OTP, etc. | Uses roles, permissions, policies |
| Example: User login | Example: Admin-only route |

### Practical Example

Suppose John logs into an application.

**Step 1: Authentication**

The backend verifies John's email and password.

Result:

```text
John is authenticated.
```

**Step 2: Authorization**

John tries to access:

```http
DELETE /api/users/101
```

The backend checks his role.

If John is a normal user, the request is rejected.

```http
403 Forbidden
```

**Remember:**

Authentication establishes identity. Authorization controls access.

---

# 4. How Authentication Works

Before implementing authentication, understand the complete login lifecycle.

Suppose you are developing an e-commerce application.

A user registers with:

```json
{
    "name": "John",
    "email": "john@example.com",
    "password": "mypassword123"
}
```

The backend should never store the original password directly.

Instead, it hashes the password and stores the resulting hash.

Later, when the user logs in:

1. The user enters email and password.
2. The backend finds the user by email.
3. The backend compares the entered password with the stored password hash.
4. If valid, the backend generates an authentication token or establishes a session.
5. The client stores or receives the authentication credential.
6. The client includes that credential in subsequent authenticated requests.
7. The backend verifies it before granting access.

### Complete Authentication Architecture

```text
               FRONTEND
                   |
                   |
             REGISTER / LOGIN
                   |
                   v
              NODE.JS API
                   |
                   v
              AUTH ROUTES
                   |
                   v
             AUTH CONTROLLER
                   |
                   v
              AUTH SERVICE
                   |
          +--------+--------+
          |                 |
          v                 v
       DATABASE        PASSWORD HASH
          |
          v
      USER RECORD
          |
          v
      TOKEN / SESSION
          |
          v
        CLIENT
          |
          v
    PROTECTED API REQUEST
          |
          v
    AUTHENTICATION MIDDLEWARE
          |
          v
       AUTHORIZATION
          |
          v
       CONTROLLER
          |
          v
       RESPONSE
```

---

# 5. User Registration

Registration allows new users to create accounts.

A typical registration API:

```http
POST /api/auth/register
```

Request body:

```json
{
    "name": "John",
    "email": "john@example.com",
    "password": "mypassword123"
}
```

The backend generally performs these operations:

1. Validate incoming data.
2. Check whether the email is already registered.
3. Hash the password.
4. Create the user record.
5. Return an appropriate response.

### Important Registration Rules

- Validate email format.
- Require a sufficiently strong password.
- Check duplicate email addresses.
- Hash passwords before storage.
- Never return password hashes in API responses.
- Do not trust frontend validation alone.

We will implement registration in the complete project later.

---

# 6. User Login

Login verifies the credentials of an existing user.

Example:

```http
POST /api/auth/login
```

Request:

```json
{
    "email": "john@example.com",
    "password": "mypassword123"
}
```

The backend:

1. Finds the user by email.
2. Checks the password against the stored hash.
3. Generates an access token or creates a session.
4. Returns the authentication result.

Example response using token-based authentication:

```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIs..."
    }
}
```

In a browser-based application, a common alternative is to store the token in an HTTP-only cookie instead of exposing it to JavaScript.

---

# 7. Password Hashing

Password hashing is one of the most important concepts in authentication.

When users register, their passwords should not be stored as plain text.

### Incorrect Approach

Suppose a user registers with:

```text
Password: mypassword123
```

Storing this directly in the database is dangerous.

```text
users
--------------------------------
id | email             | password
--------------------------------
1  | john@example.com  | mypassword123
```

If someone gains access to the database, they can read users' passwords.

### Correct Approach

Instead, hash the password before saving it.

Example:

```text
Original Password:
mypassword123

       |
       v

Password Hashing Algorithm

       |
       v

Stored Hash:
$2b$12$exampleHashValue...
```

Database:

```text
users
------------------------------------------------
id | email             | password_hash
------------------------------------------------
1  | john@example.com  | $2b$12$exampleHash...
```

The original password is not stored.

### What is Hashing?

Hashing is a one-way transformation that converts input data into a fixed-length or algorithm-dependent digest.

For password storage, specialized password hashing algorithms are used.

Examples:

- bcrypt.
- Argon2id.
- scrypt.

### Important

Password hashing should be:

- One-way.
- Computationally expensive.
- Salted.
- Resistant to brute-force attacks.

A fast general-purpose hash such as MD5 or plain SHA-256 should not be used for password storage.

---

# 8. Encryption vs Hashing

These concepts are different.

| Hashing | Encryption |
|---|---|
| One-way transformation | Reversible transformation |
| No decryption process | Can be decrypted with the correct key |
| Used for password verification | Used for confidentiality |
| Uses hashing algorithms | Uses encryption algorithms |
| Example: bcrypt, Argon2id | Example: AES |

### Hashing Example

```text
Password
   |
   v
Hashing
   |
   v
Password Hash
```

You cannot normally recover the original password from the hash.

### Encryption Example

```text
Original Data
      |
      v
  Encryption
      |
      v
Encrypted Data
      |
      v
  Decryption
      |
      v
 Original Data
```

Encryption is reversible when the correct decryption key is available.

### What is Salt?

A salt is a random value added during password hashing.

It ensures that identical passwords do not produce identical stored hashes when independently salted.

For example:

```text
Password: mypassword123

Salt A + Password → Hash A
Salt B + Password → Hash B
```

bcrypt automatically generates and stores the salt information within its encoded hash.

You do not need to store a separate salt column when using bcrypt correctly.

---

# 9. bcrypt and bcryptjs

bcrypt is a password hashing algorithm and library commonly used in Node.js applications.

It provides:

- Password hashing.
- Password comparison.
- Automatic salt generation.
- Configurable computational cost.

Two commonly encountered Node.js packages are:

- `bcrypt`
- `bcryptjs`

`bcrypt` uses native bindings.

`bcryptjs` is a JavaScript implementation.

### Install bcrypt

```bash
npm install bcrypt
```

### Hash a Password

```javascript
const bcrypt = require("bcrypt");

async function hashPassword(password) {

    const saltRounds = 12;

    const hashedPassword = await bcrypt.hash(
        password,
        saltRounds
    );

    return hashedPassword;

}
```

### Explanation

```javascript
bcrypt.hash(password, saltRounds);
```

- `password`: Original password.
- `saltRounds`: Cost factor controlling the work required for hashing.
- Return value: Encoded password hash.

A higher cost increases computational expense.

Choose the cost based on your production hardware and performance requirements.

### Compare Password

During login:

```javascript
const bcrypt = require("bcrypt");

async function verifyPassword(password, hashedPassword) {

    const isMatch = await bcrypt.compare(
        password,
        hashedPassword
    );

    return isMatch;

}
```

Example:

```javascript
const password = "mypassword123";

const hashedPassword = await bcrypt.hash(password, 12);

const isMatch = await bcrypt.compare(
    password,
    hashedPassword
);

console.log(isMatch);
```

Output:

```text
true
```

### Important

You should never compare a plain password and a hash using `===`.

Incorrect:

```javascript
password === hashedPassword
```

Correct:

```javascript
await bcrypt.compare(password, hashedPassword);
```

---

# 10. What is JSON Web Token (JWT)?

JWT stands for **JSON Web Token**.

JWT is a compact token format used to represent claims between parties.

It is commonly used for authentication and authorization.

A JWT can be signed so that the receiving application can verify its integrity and authenticity.

### Why Do We Need JWT?

Suppose a user logs in successfully.

How will the backend identify that user in subsequent API requests?

One solution is to issue an access token.

The client sends that token with subsequent requests.

The server verifies the token and identifies the user.

### JWT Authentication Flow

```text
              USER
                |
                v
             LOGIN
                |
                v
          NODE.JS SERVER
                |
                v
        VERIFY CREDENTIALS
                |
                v
          GENERATE JWT
                |
                v
          SEND TO CLIENT
                |
                v
          CLIENT STORES
          AUTH CREDENTIAL
                |
                v
        REQUEST PROTECTED API
                |
                v
          SEND JWT TOKEN
                |
                v
       AUTHENTICATION MIDDLEWARE
                |
                v
           VERIFY JWT
                |
          +-----+-----+
          |           |
          v           v
        VALID       INVALID
          |           |
          v           v
       CONTINUE     REJECT
```

---

# 11. JWT Structure

A JWT generally consists of three parts:

1. Header.
2. Payload.
3. Signature.

These parts are separated by dots.

```text
HEADER.PAYLOAD.SIGNATURE
```

Example:

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.
eyJpZCI6MSwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIn0
.
signatureValue
```

Let's understand each part.

## 11.1 Header

The header contains metadata about the token.

Example:

```json
{
    "alg": "HS256",
    "typ": "JWT"
}
```

- `alg`: Signing algorithm.
- `typ`: Token type.

## 11.2 Payload

The payload contains claims.

Example:

```json
{
    "id": 101,
    "email": "john@example.com",
    "role": "user",
    "iat": 1790000000,
    "exp": 1790003600
}
```

Common JWT claims:

| Claim | Meaning |
|---|---|
| `iss` | Issuer |
| `sub` | Subject |
| `aud` | Audience |
| `exp` | Expiration time |
| `iat` | Issued at |
| `nbf` | Not valid before |
| `jti` | JWT ID |

You can also define custom claims.

## 11.3 Signature

The signature helps verify that the token has not been modified.

For an HMAC-based JWT, the signature is generated using the encoded header, encoded payload, and secret key.

Conceptually:

```text
HMAC(
    Base64Url(Header) + "." + Base64Url(Payload),
    SecretKey
)
```

If someone modifies the payload, the signature verification will fail.

### Important: JWT Payload Is Not Encrypted

A normal signed JWT is readable by anyone who obtains it.

Base64URL encoding is not encryption.

Therefore:

**Never store passwords, database credentials, or other secrets inside JWT payloads.**

JWT signatures provide integrity, not confidentiality.

---

# 12. Implement JWT in Node.js

Install:

```bash
npm install jsonwebtoken
```

Import:

```javascript
const jwt = require("jsonwebtoken");
```

### Generate Token

```javascript
const jwt = require("jsonwebtoken");

function generateToken(user) {

    const token = jwt.sign(

        {
            id: user.id,
            email: user.email,
            role: user.role
        },

        process.env.JWT_SECRET,

        {
            expiresIn: "15m"
        }

    );

    return token;

}
```

### Explanation

```javascript
jwt.sign(payload, secret, options);
```

| Parameter | Purpose |
|---|---|
| `payload` | Data stored inside token |
| `secret` | Signing secret |
| `expiresIn` | Token expiration |

### Verify Token

```javascript
const jwt = require("jsonwebtoken");

function verifyToken(token) {

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        return decoded;

    } catch (error) {

        return null;

    }

}
```

### Decode vs Verify

These methods are different.

```javascript
jwt.decode(token);
```

Decodes the token without verifying its signature.

```javascript
jwt.verify(token, secret);
```

Verifies the signature and checks applicable claims such as expiration.

**Never use `jwt.decode()` alone to authenticate a user.**

---

# 13. Access Tokens

An access token is a credential used to access protected resources.

Example:

```text
Access Token
    |
    v
GET /api/profile
    |
    v
Authorization Header
    |
    v
Backend Verification
    |
    v
Return Profile
```

### Example

```http
GET /api/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### What is Bearer?

Bearer is an HTTP authentication scheme.

It means whoever possesses the token can present it to access the protected resource, subject to the server's verification and authorization rules.

### Access Token Characteristics

- Usually short-lived.
- Used for API authentication.
- Sent with protected requests.
- Should not contain sensitive information.
- Should be protected against theft.

Example expiration:

```javascript
{
    expiresIn: "15m"
}
```

This means the token expires after 15 minutes.

---

# 14. Refresh Tokens

An access token expires after a limited period.

What happens when it expires?

The user would need to log in again unless the application supports a refresh mechanism.

A refresh token allows the client to obtain a new access token without asking the user to enter credentials again.

### Access Token vs Refresh Token

| Access Token | Refresh Token |
|---|---|
| Used to access APIs | Used to obtain new access tokens |
| Short-lived | Usually longer-lived |
| Sent with API requests | Sent only to refresh endpoint |
| Limited lifetime | Longer lifetime |
| Used frequently | Used less frequently |

### Example Lifetimes

```text
Access Token: 15 minutes

Refresh Token: 7 days
```

These are illustrative values, not universal requirements.

### Refresh Token Flow

```text
            USER LOGIN
                |
                v
          VERIFY CREDENTIALS
                |
                v
       GENERATE TWO TOKENS
                |
          +-----+-----+
          |           |
          v           v
     ACCESS TOKEN  REFRESH TOKEN
          |           |
          v           v
       API ACCESS   TOKEN STORAGE
          |
          v
      TOKEN EXPIRES
          |
          v
      REFRESH REQUEST
          |
          v
      VERIFY REFRESH TOKEN
          |
          v
      ISSUE NEW ACCESS TOKEN
```

### Example Refresh Endpoint

```http
POST /api/auth/refresh
```

The client sends the refresh token through a secure cookie or another protected mechanism.

The backend:

1. Retrieves the refresh token.
2. Validates it.
3. Checks whether it is still active and not revoked.
4. Issues a new access token.
5. Optionally rotates the refresh token.

### Important: Refresh Token Rotation

Refresh token rotation means issuing a new refresh token whenever an existing refresh token is used.

The previous token is invalidated.

This helps detect token reuse and limits the damage from stolen refresh tokens.

A production refresh-token system should also support:

- Server-side revocation.
- Token expiry.
- Token family tracking.
- Reuse detection.
- Logout from individual devices.

---

# 15. Token-Based Authentication

Token-based authentication uses tokens to authenticate requests.

JWT is one possible token format.

### Complete Flow

**Step 1: Login**

```http
POST /api/auth/login
```

**Step 2: Backend Verifies Credentials**

The server checks the email and password.

**Step 3: Backend Generates Token**

```javascript
const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
);
```

**Step 4: Client Receives Token**

The client receives the token, commonly through a response body or an HTTP-only cookie.

**Step 5: Client Requests Protected Resource**

```http
GET /api/profile
Authorization: Bearer TOKEN
```

**Step 6: Backend Verifies Token**

```javascript
const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
);
```

**Step 7: Backend Returns Protected Data**

If the token is valid and the user is authorized, the request proceeds.

### Advantages

- Suitable for APIs.
- Can support multiple clients.
- Does not require a traditional server-side login session.
- Useful for distributed systems.

### Disadvantages

- Token revocation requires additional design.
- Stolen tokens can be misused until invalidated or expired.
- Token storage requires careful security decisions.
- JWT payloads can expose information if developers include sensitive claims.

---

# 16. Session-Based Authentication

Session-based authentication stores login state on the server.

When a user logs in:

1. The backend verifies credentials.
2. The backend creates a session.
3. The backend stores session information.
4. The client receives a session identifier.
5. The client sends that identifier with future requests.
6. The backend retrieves the session and identifies the user.

### Session Flow

```text
            USER LOGIN
                |
                v
          VERIFY CREDENTIALS
                |
                v
          CREATE SESSION
                |
                v
        STORE SESSION SERVER-SIDE
                |
                v
        SEND SESSION ID TO CLIENT
                |
                v
           CLIENT COOKIE
                |
                v
        FUTURE API REQUEST
                |
                v
        SESSION ID SENT TO SERVER
                |
                v
        LOOKUP SESSION IN STORE
                |
                v
          AUTHENTICATE USER
```

### Example Session Data

```json
{
    "sessionId": "abc123",
    "userId": 101,
    "expiresAt": "2026-11-25T10:00:00Z"
}
```

This is illustrative session data, not necessarily the exact format stored by a session library.

### Session vs Token Authentication

| Session-Based | Token-Based |
|---|---|
| Stores session state server-side | Commonly uses signed credentials |
| Client stores session ID | Client stores or receives token |
| Server looks up session | Server verifies token |
| Easy central revocation | JWT revocation requires additional mechanisms |
| Requires shared session storage across instances | Can be stateless for access-token verification |

### Important

JWT is not always better than sessions.

Both are valid approaches.

The right choice depends on the application architecture and security requirements.

For many traditional browser applications, server-side sessions with secure cookies are an excellent option.

---

# 17. What are Cookies?

A cookie is a small piece of data stored by the browser and associated with a website.

Cookies are commonly used for:

- Authentication.
- Session management.
- User preferences.
- Shopping carts.
- Tracking.

### Example

A server can send:

```http
Set-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Lax
```

The browser stores the cookie.

For subsequent matching requests, the browser automatically sends it:

```http
Cookie: sessionId=abc123
```

### Important Cookie Attributes

| Attribute | Purpose |
|---|---|
| `HttpOnly` | Prevents JavaScript from reading the cookie |
| `Secure` | Sends cookie only over secure HTTPS connections |
| `SameSite` | Controls cross-site cookie sending |
| `Max-Age` | Defines cookie lifetime in seconds |
| `Expires` | Defines cookie expiration date |
| `Path` | Restricts cookie to a URL path |
| `Domain` | Defines the cookie's domain scope |

---

# 18. HTTP-Only Cookies

An HTTP-only cookie cannot be accessed through JavaScript using:

```javascript
document.cookie
```

### Why Use HTTP-Only Cookies?

Suppose an attacker manages to execute malicious JavaScript on your website.

This is called Cross-Site Scripting (XSS).

If your authentication token is stored in a JavaScript-accessible location, the malicious script may be able to steal it.

An HTTP-only cookie prevents JavaScript from reading that cookie directly.

### Example

```http
Set-Cookie: accessToken=abc123; HttpOnly
```

JavaScript cannot read this cookie.

However, the browser can still send it with matching HTTP requests.

### Important

HTTP-only cookies reduce one token-theft risk, but they do not eliminate XSS or prevent malicious scripts from performing authenticated actions through the browser.

You still need proper XSS protection.

---

# 19. Secure Cookies

The `Secure` attribute ensures that a cookie is sent only over secure HTTPS connections.

Example:

```http
Set-Cookie: accessToken=abc123; Secure
```

For production authentication cookies, use HTTPS and set the `Secure` attribute.

### What is SameSite?

SameSite controls whether cookies are sent with cross-site requests.

Three common values:

#### Strict

```http
SameSite=Strict
```

Restricts cookie sending in cross-site contexts.

#### Lax

```http
SameSite=Lax
```

Allows cookies in some top-level cross-site navigations while restricting many cross-site subrequests.

#### None

```http
SameSite=None; Secure
```

Allows cross-site cookie sending, provided the cookie is also Secure.

This is often required for cross-site frontend and backend deployments.

### Cookie Security Example

```javascript
res.cookie("accessToken", token, {

    httpOnly: true,

    secure: process.env.NODE_ENV === "production",

    sameSite: "lax",

    maxAge: 15 * 60 * 1000

});
```

### Important: Cookies and CSRF

Browsers automatically attach matching cookies to requests.

This creates a Cross-Site Request Forgery (CSRF) risk.

For cookie-based authentication, use appropriate CSRF defenses, such as:

- SameSite cookie policies.
- CSRF tokens where required.
- Origin/Referer validation.
- Restricting accepted content types and request methods appropriately.

We will study security concepts more deeply in Phase 12.

---

# 20. Authentication Middleware

Middleware is a function that executes during the request-response lifecycle.

Authentication middleware checks whether the request contains valid authentication credentials.

### Example

Suppose you have a protected endpoint:

```http
GET /api/profile
```

Only authenticated users should access it.

You can create authentication middleware.

### authMiddleware.js

```javascript
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });

        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });

    }

}

module.exports = authMiddleware;
```

### Understand the Code

```javascript
req.headers.authorization
```

Reads the Authorization header.

```javascript
authHeader.startsWith("Bearer ")
```

Checks whether the header uses the Bearer scheme.

```javascript
jwt.verify(token, process.env.JWT_SECRET)
```

Verifies the token.

```javascript
req.user = decoded;
```

Stores verified claims on the request object.

```javascript
next();
```

Passes control to the next middleware or route handler.

### Important

The JWT verification proves that the token is valid according to the configured verification rules.

It does not automatically prove that:

- The user still exists.
- The account is active.
- The user has not been banned.
- The user's role has not changed.
- The token has not been revoked through an external mechanism.

For sensitive operations, you may need to retrieve current user information from the database.

---

# 21. Protected Routes

A protected route is an API endpoint that requires authentication.

Example:

```javascript
const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

router.get("/profile", authMiddleware, (req, res) => {

    res.json({
        success: true,
        message: "Protected profile",
        user: req.user
    });

});

module.exports = router;
```

### Request Without Token

```http
GET /api/profile
```

Response:

```http
401 Unauthorized
```

```json
{
    "success": false,
    "message": "Authentication required"
}
```

### Request With Valid Token

```http
GET /api/profile
Authorization: Bearer YOUR_ACCESS_TOKEN
```

Response:

```json
{
    "success": true,
    "message": "Protected profile",
    "user": {
        "id": 101,
        "email": "john@example.com"
    }
}
```

---

# 22. Role-Based Access Control (RBAC)

RBAC stands for **Role-Based Access Control**.

It is an authorization approach where permissions are assigned to roles, and users receive roles.

Example:

```text
ADMIN
  |
  ├── Create User
  ├── Delete User
  ├── Update User
  └── View Users

MANAGER
  |
  ├── View Users
  └── Manage Orders

USER
  |
  ├── View Products
  └── Place Orders
```

### Example User Roles

```json
{
    "id": 101,
    "name": "John",
    "role": "admin"
}
```

Another user:

```json
{
    "id": 102,
    "name": "David",
    "role": "user"
}
```

### Create Role Middleware

File: `middleware/roleMiddleware.js`

```javascript
function authorizeRoles(...allowedRoles) {

    return (req, res, next) => {

        if (!req.user) {

            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });

        }

        if (!allowedRoles.includes(req.user.role)) {

            return res.status(403).json({
                success: false,
                message: "Access forbidden"
            });

        }

        next();

    };

}

module.exports = authorizeRoles;
```

### Usage

```javascript
const authMiddleware = require("./middleware/authMiddleware");

const authorizeRoles = require("./middleware/roleMiddleware");

app.delete(
    "/api/users/:id",
    authMiddleware,
    authorizeRoles("admin"),
    deleteUser
);
```

### Request Flow

```text
       API REQUEST
            |
            v
    AUTHENTICATION
            |
            v
      VERIFY TOKEN
            |
            v
       ROLE CHECK
            |
       +----+----+
       |         |
       v         v
     ADMIN     USER
       |         |
       v         v
     ALLOW     DENY
```

### Important Security Rule

Never allow users to choose their own role during registration.

Incorrect:

```json
{
    "name": "John",
    "email": "john@example.com",
    "password": "password123",
    "role": "admin"
}
```

If your registration endpoint blindly accepts this field, an attacker could register as an administrator.

Instead, assign a safe default role on the server:

```javascript
const user = await User.create({

    name: req.body.name,

    email: req.body.email,

    password: hashedPassword,

    role: "user"

});
```

Administrative role changes should be handled through a separately authorized process.

---

# 23. Permission-Based Authorization

RBAC assigns permissions through roles.

However, some applications require more detailed access control.

For example:

An admin can manage everything.

A manager can manage orders but cannot manage users.

A support agent can view customer details but cannot delete accounts.

This can be implemented using permissions.

### Example Permission Structure

```json
{
    "role": "manager",
    "permissions": [
        "orders.read",
        "orders.update",
        "products.read"
    ]
}
```

### Permission Middleware

```javascript
function authorizePermissions(...permissions) {

    return (req, res, next) => {

        const userPermissions = req.user.permissions || [];

        const hasPermission = permissions.every(
            permission => userPermissions.includes(permission)
        );

        if (!hasPermission) {

            return res.status(403).json({
                success: false,
                message: "Insufficient permissions"
            });

        }

        next();

    };

}
```

Usage:

```javascript
app.put(
    "/api/orders/:id",
    authMiddleware,
    authorizePermissions("orders.update"),
    updateOrder
);
```

### RBAC vs Permission-Based Authorization

| RBAC | Permission-Based |
|---|---|
| Uses roles | Uses specific permissions |
| Simpler to manage | More granular |
| Example: Admin | Example: `users.delete` |
| Good for simpler systems | Useful for complex applications |

A common production design combines both: roles are assigned permissions, and users inherit those permissions through their roles.

---

# 24. Logout Implementation

Logout means ending or invalidating the user's authenticated session.

The implementation depends on the authentication mechanism.

## 24.1 Logout with Sessions

For session-based authentication, destroy the server-side session.

Example using `express-session`:

```javascript
app.post("/logout", (req, res, next) => {

    req.session.destroy((error) => {

        if (error) {
            return next(error);
        }

        res.clearCookie("connect.sid");

        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    });

});
```

The cookie name must match your session configuration.

## 24.2 Logout with JWT

A self-contained access JWT remains valid until expiration unless you implement revocation.

Simply deleting the token from the frontend does not invalidate a stolen copy.

Common strategies include:

1. Short-lived access tokens.
2. Refresh token revocation.
3. Refresh token rotation.
4. Access-token denylist for immediate revocation.
5. Token version or session version checks.

### Refresh Token Revocation Example

Suppose refresh tokens are stored in a database.

When a user logs out:

```javascript
await RefreshToken.destroy({
    where: {
        userId: user.id
    }
});
```

This example revokes all refresh tokens belonging to the user.

A production application may revoke only the current device's token.

### Clear Authentication Cookie

```javascript
res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
});
```

The cookie options should match the original cookie's relevant scope attributes, especially `path` and `domain`, if configured.

---

# 25. Password Reset

Password reset allows users to recover access to their accounts when they forget their passwords.

A typical flow:

```text
        USER FORGOT PASSWORD
                |
                v
        ENTER REGISTERED EMAIL
                |
                v
         BACKEND GENERATES
          RESET TOKEN
                |
                v
          SEND RESET LINK
             BY EMAIL
                |
                v
         USER OPENS LINK
                |
                v
         ENTER NEW PASSWORD
                |
                v
        VERIFY RESET TOKEN
                |
                v
        HASH NEW PASSWORD
                |
                v
        UPDATE DATABASE
                |
                v
        PASSWORD RESET DONE
```

### Step 1: Request Password Reset

```http
POST /api/auth/forgot-password
```

Request:

```json
{
    "email": "john@example.com"
}
```

The server should return a generic response regardless of whether the account exists.

Example:

```json
{
    "success": true,
    "message": "If the account exists, a reset link will be sent."
}
```

This helps prevent account enumeration.

### Step 2: Generate Reset Token

```javascript
const crypto = require("crypto");

const resetToken = crypto.randomBytes(32).toString("hex");
```

### Step 3: Store Token Hash

Store a hash of the reset token rather than the raw token.

```javascript
const tokenHash = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
```

Store:

```text
user_id
token_hash
expires_at
used_at
```

### Step 4: Send Reset Link

Example:

```text
https://example.com/reset-password?token=RAW_TOKEN
```

The raw token is sent to the user through a secure email link.

### Step 5: Verify Token and Reset Password

The backend:

1. Hashes the submitted token.
2. Finds its matching stored hash.
3. Checks expiration.
4. Checks whether it has already been used.
5. Hashes the new password.
6. Updates the password.
7. Marks the reset token as used.
8. Invalidates existing sessions or refresh tokens where appropriate.

### Important Security Rules

- Use cryptographically secure random tokens.
- Store only token hashes.
- Make tokens short-lived.
- Allow each token to be used once.
- Avoid revealing whether an email address is registered.
- Rate-limit reset requests.
- Invalidate existing authentication sessions when appropriate.

---

# 26. Email Verification

Email verification confirms that a user has access to the email address used during registration.

### Email Verification Flow

```text
        USER REGISTERS
              |
              v
        CREATE USER
        UNVERIFIED
              |
              v
       GENERATE TOKEN
              |
              v
        SEND EMAIL LINK
              |
              v
        USER CLICKS LINK
              |
              v
        VERIFY TOKEN
              |
              v
        UPDATE DATABASE
              |
              v
       EMAIL VERIFIED
```

### Example User Record

```json
{
    "id": 101,
    "email": "john@example.com",
    "emailVerified": false
}
```

After successful verification:

```json
{
    "id": 101,
    "email": "john@example.com",
    "emailVerified": true
}
```

### Why Email Verification?

1. Confirms email ownership.
2. Reduces fake registrations.
3. Helps with account recovery.
4. Improves communication reliability.

Use a secure, expiring, single-use verification token.

---

# 27. OAuth 2.0 and Google Login

OAuth 2.0 is an authorization framework that allows applications to obtain limited access to protected resources.

It is commonly used in third-party integrations.

For example:

- Login using Google.
- Login using GitHub.
- Login using Microsoft.

### What is Social Login?

Social login allows users to authenticate using an existing identity provider account.

Example:

```text
          YOUR APPLICATION
                 |
                 v
          LOGIN WITH GOOGLE
                 |
                 v
           GOOGLE LOGIN
                 |
                 v
         USER AUTHENTICATION
                 |
                 v
          CONSENT / APPROVAL
                 |
                 v
         CALLBACK TO YOUR APP
                 |
                 v
          VERIFY IDENTITY
                 |
                 v
          CREATE APP SESSION
```

### OAuth 2.0 vs OpenID Connect

These terms are related but different.

**OAuth 2.0:**

An authorization framework used to grant access to resources.

**OpenID Connect (OIDC):**

An identity layer built on top of OAuth 2.0.

OIDC adds authentication functionality and defines the ID token.

For Google Sign-In, OpenID Connect is commonly used.

### Common OAuth 2.0 Grant Types

| Grant Type | Purpose |
|---|---|
| Authorization Code | Common for web and native applications |
| Authorization Code with PKCE | Recommended for public clients and also useful for confidential clients |
| Client Credentials | Machine-to-machine authorization |
| Device Authorization | Devices with limited input capabilities |

The Resource Owner Password Credentials grant should not be used for new applications.

### Important OAuth Security Concepts

- Use the Authorization Code flow.
- Use PKCE where appropriate.
- Validate `state`.
- Validate OIDC `nonce` when applicable.
- Validate ID token signature and claims.
- Use exact redirect URI matching.
- Never expose client secrets in frontend code.

---

# 28. Authentication Security Best Practices

Authentication is security-sensitive.

Follow these practices when building production applications.

## 28.1 Hash Passwords

Use bcrypt or Argon2id.

Never store plain-text passwords.

## 28.2 Use Strong Secrets

Example `.env`:

```env
JWT_SECRET=your_long_random_secret
```

Use cryptographically secure random secrets.

Never commit secrets to GitHub.

## 28.3 Set Token Expiration

Avoid long-lived access tokens.

Use an appropriate expiration policy.

## 28.4 Validate JWT Algorithms

Do not blindly trust the token's declared algorithm.

Configure accepted algorithms explicitly when verifying tokens.

## 28.5 Use HTTPS

Always protect authentication credentials during transmission.

## 28.6 Use HTTP-Only Cookies Where Appropriate

Avoid exposing sensitive authentication tokens to browser JavaScript when cookie-based authentication is suitable.

## 28.7 Protect Against CSRF

Cookie-based authentication needs appropriate CSRF protections.

## 28.8 Protect Against XSS

Use secure frontend rendering, output encoding, and Content Security Policy where appropriate.

## 28.9 Implement Rate Limiting

Prevent unlimited login attempts and password-reset requests.

## 28.10 Use Generic Login Errors

Avoid revealing whether an email address exists.

Example:

```json
{
    "success": false,
    "message": "Invalid email or password"
}
```

## 28.11 Recheck User Status

For sensitive requests, check whether the user is still active and authorized.

## 28.12 Implement Refresh Token Rotation

Use refresh token rotation and reuse detection where applicable.

## 28.13 Never Store Sensitive Information in JWT Payloads

JWT payloads are readable unless encryption is specifically used.

## 28.14 Do Not Trust Client-Supplied Roles

Always derive permissions from trusted server-side data.

---

# 29. Complete Authentication System with Node.js and Express

Now let's build a practical authentication API.

### Technology Stack

- Node.js.
- Express.js.
- MySQL.
- Sequelize.
- bcrypt.
- jsonwebtoken.
- dotenv.

### Features

1. User Registration.
2. User Login.
3. Password Hashing.
4. JWT Generation.
5. Authentication Middleware.
6. Protected Profile API.
7. Admin-Only API.
8. Logout using refresh-token revocation.

For this example, the access token is returned in the JSON response and the refresh token is stored in an HTTP-only cookie.

The refresh-token implementation uses a database table so that refresh tokens can be revoked.

## 29.1 Project Structure

```text
auth-api/
│
├── src/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── RefreshToken.js
│   │
│   ├── controllers/
│   │   └── authController.js
│   │
│   ├── services/
│   │   └── authService.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   │
│   └── app.js
│
├── server.js
├── .env
├── .gitignore
└── package.json
```

## 29.2 Install Packages

```bash
npm init -y
```

Install:

```bash
npm install express sequelize mysql2 bcrypt jsonwebtoken dotenv cookie-parser
```

## 29.3 Create Database

```sql
CREATE DATABASE auth_api;
```

## 29.4 Configure Environment Variables

File: `.env`

```env
PORT=3000

NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=auth_api
DB_PORT=3306

JWT_SECRET=replace_with_a_long_random_secret

JWT_ACCESS_EXPIRES=15m

REFRESH_TOKEN_DAYS=7
```

Generate a secure random secret using Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Use the generated value for `JWT_SECRET`.

## 29.5 Configure Database

File: `src/config/db.js`

```javascript
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 3306,
        dialect: "mysql",
        logging: false
    }
);

module.exports = sequelize;
```

## 29.6 Create User Model

File: `src/models/User.js`

```javascript
const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const User = sequelize.define("User", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    role: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: "user",
        allowNull: false
    }

}, {

    tableName: "users",

    timestamps: true

});

module.exports = User;
```

## 29.7 Create RefreshToken Model

File: `src/models/RefreshToken.js`

```javascript
const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const RefreshToken = sequelize.define("RefreshToken", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    tokenHash: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    }

}, {

    tableName: "refresh_tokens",

    timestamps: true

});

module.exports = RefreshToken;
```

The raw refresh token will not be stored in this table. Only its SHA-256 hash will be stored.

## 29.8 Create Authentication Service

File: `src/services/authService.js`

```javascript
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const crypto = require("crypto");

const User = require("../models/User");

const RefreshToken = require("../models/RefreshToken");

const ACCESS_TOKEN_EXPIRY =
    process.env.JWT_ACCESS_EXPIRES || "15m";

const REFRESH_TOKEN_DAYS =
    Number(process.env.REFRESH_TOKEN_DAYS) || 7;

// HASH REFRESH TOKEN
function hashRefreshToken(token) {

    return crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

}

// GENERATE ACCESS TOKEN
function generateAccessToken(user) {

    return jwt.sign(

        {
            id: user.id,
            email: user.email,
            role: user.role
        },

        process.env.JWT_SECRET,

        {
            expiresIn: ACCESS_TOKEN_EXPIRY,
            algorithm: "HS256"
        }

    );

}

// CREATE REFRESH TOKEN
async function createRefreshToken(userId) {

    const rawToken = crypto.randomBytes(64).toString("hex");

    const tokenHash = hashRefreshToken(rawToken);

    const expiresAt = new Date(
        Date.now() + REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000
    );

    await RefreshToken.create({

        userId,

        tokenHash,

        expiresAt

    });

    return rawToken;

}

// REGISTER
exports.register = async (data) => {

    const { name, email, password } = data;

    const existingUser = await User.findOne({
        where: { email }
    });

    if (existingUser) {

        const error = new Error("Email already registered");

        error.statusCode = 409;

        throw error;

    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({

        name,

        email,

        password: hashedPassword,

        role: "user"

    });

    return user;

};

// LOGIN
exports.login = async (email, password) => {

    const user = await User.findOne({
        where: { email }
    });

    if (!user) {

        const error = new Error("Invalid email or password");

        error.statusCode = 401;

        throw error;

    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {

        const error = new Error("Invalid email or password");

        error.statusCode = 401;

        throw error;

    }

    const accessToken = generateAccessToken(user);

    const refreshToken = await createRefreshToken(user.id);

    return {
        user,
        accessToken,
        refreshToken
    };

};

// REFRESH ACCESS TOKEN
exports.refresh = async (rawToken) => {

    if (!rawToken) {

        const error = new Error("Refresh token required");

        error.statusCode = 401;

        throw error;

    }

    const tokenHash = hashRefreshToken(rawToken);

    const storedToken = await RefreshToken.findOne({

        where: {
            tokenHash
        },

        include: [{
            model: User,
            as: "user"
        }]

    });

    if (
        !storedToken ||
        storedToken.expiresAt <= new Date()
    ) {

        const error = new Error("Invalid or expired refresh token");

        error.statusCode = 401;

        throw error;

    }

    const user = storedToken.user;

    if (!user) {

        const error = new Error("Invalid refresh token");

        error.statusCode = 401;

        throw error;

    }

    // Rotate refresh token
    await storedToken.destroy();

    const newRefreshToken = await createRefreshToken(user.id);

    const accessToken = generateAccessToken(user);

    return {
        accessToken,
        refreshToken: newRefreshToken
    };

};

// LOGOUT
exports.logout = async (rawToken) => {

    if (!rawToken) {
        return;
    }

    const tokenHash = hashRefreshToken(rawToken);

    await RefreshToken.destroy({

        where: {
            tokenHash
        }

    });

};
```

### Important Model Association

The refresh service uses:

```javascript
include: [{
    model: User,
    as: "user"
}]
```

We need to define the relationship.

Create the association after both models are imported.

For example, in `src/models/associations.js`:

```javascript
const User = require("./User");

const RefreshToken = require("./RefreshToken");

User.hasMany(RefreshToken, {
    foreignKey: "userId",
    as: "refreshTokens"
});

RefreshToken.belongsTo(User, {
    foreignKey: "userId",
    as: "user"
});

module.exports = {
    User,
    RefreshToken
};
```

This establishes a One-to-Many relationship:

```text
USER
  |
  | 1
  |
  | Many
  |
REFRESH TOKENS
```

## 29.9 Create Authentication Controller

File: `src/controllers/authController.js`

```javascript
const authService = require("../services/authService");

// REGISTER
exports.register = async (req, res, next) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });

        }

        const user = await authService.register({
            name,
            email,
            password
        });

        res.status(201).json({

            success: true,

            message: "Registration successful",

            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }

        });

    } catch (error) {

        next(error);

    }

};

// LOGIN
exports.login = async (req, res, next) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });

        }

        const result = await authService.login(email, password);

        res.cookie("refreshToken", result.refreshToken, {

            httpOnly: true,

            secure: process.env.NODE_ENV === "production",

            sameSite: "lax",

            path: "/api/auth",

            maxAge: 7 * 24 * 60 * 60 * 1000

        });

        res.status(200).json({

            success: true,

            message: "Login successful",

            data: {
                user: {
                    id: result.user.id,
                    name: result.user.name,
                    email: result.user.email,
                    role: result.user.role
                },

                accessToken: result.accessToken
            }

        });

    } catch (error) {

        next(error);

    }

};

// REFRESH
exports.refresh = async (req, res, next) => {

    try {

        const result = await authService.refresh(
            req.cookies.refreshToken
        );

        res.cookie("refreshToken", result.refreshToken, {

            httpOnly: true,

            secure: process.env.NODE_ENV === "production",

            sameSite: "lax",

            path: "/api/auth",

            maxAge: 7 * 24 * 60 * 60 * 1000

        });

        res.status(200).json({

            success: true,

            data: {
                accessToken: result.accessToken
            }

        });

    } catch (error) {

        next(error);

    }

};

// LOGOUT
exports.logout = async (req, res, next) => {

    try {

        await authService.logout(
            req.cookies.refreshToken
        );

        res.clearCookie("refreshToken", {

            httpOnly: true,

            secure: process.env.NODE_ENV === "production",

            sameSite: "lax",

            path: "/api/auth"

        });

        res.status(200).json({

            success: true,

            message: "Logout successful"

        });

    } catch (error) {

        next(error);

    }

};
```

## 29.10 Create Authentication Middleware

File: `src/middleware/authMiddleware.js`

```javascript
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            return res.status(401).json({

                success: false,

                message: "Authentication required"

            });

        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET,

            {
                algorithms: ["HS256"]
            }

        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({

            success: false,

            message: "Invalid or expired token"

        });

    }

}

module.exports = authMiddleware;
```

## 29.11 Create Role Middleware

File: `src/middleware/roleMiddleware.js`

```javascript
function authorizeRoles(...roles) {

    return (req, res, next) => {

        if (!req.user) {

            return res.status(401).json({

                success: false,

                message: "Authentication required"

            });

        }

        if (!roles.includes(req.user.role)) {

            return res.status(403).json({

                success: false,

                message: "Access forbidden"

            });

        }

        next();

    };

}

module.exports = authorizeRoles;
```

## 29.12 Create Authentication Routes

File: `src/routes/authRoutes.js`

```javascript
const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/refresh", authController.refresh);

router.post("/logout", authController.logout);

module.exports = router;
```

## 29.13 Create User Routes

File: `src/routes/userRoutes.js`

```javascript
const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

// Protected profile
router.get("/profile", authMiddleware, (req, res) => {

    res.status(200).json({

        success: true,

        message: "Profile fetched successfully",

        user: req.user

    });

});

// Admin-only route
router.get(
    "/admin",
    authMiddleware,
    authorizeRoles("admin"),
    (req, res) => {

        res.status(200).json({

            success: true,

            message: "Welcome Admin"

        });

    }
);

module.exports = router;
```

## 29.14 Create app.js

File: `src/app.js`

```javascript
const express = require("express");

const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.use(cookieParser());

app.get("/health", (req, res) => {

    res.json({
        success: true,
        message: "API is running"
    });

});

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "Route not found"

    });

});

app.use((err, req, res, next) => {

    console.error(err);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({

        success: false,

        message: statusCode >= 500
            ? "Internal Server Error"
            : err.message

    });

});

module.exports = app;
```

## 29.15 Create server.js

File: `server.js`

```javascript
require("dotenv").config();

const app = require("./src/app");

const sequelize = require("./src/config/db");

const User = require("./src/models/User");

const RefreshToken = require("./src/models/RefreshToken");

require("./src/models/associations");

const PORT = process.env.PORT || 3000;

async function startServer() {

    try {

        await sequelize.authenticate();

        console.log("Database connected");

        await sequelize.sync();

        console.log("Database synchronized");

        app.listen(PORT, () => {

            console.log(`Server running on port ${PORT}`);

        });

    } catch (error) {

        console.error("Server startup failed:", error);

        process.exit(1);

    }

}

startServer();
```

---

# 30. Test Authentication API Using Postman

Start the server:

```bash
npm run dev
```

### 1. Register

```http
POST http://localhost:3000/api/auth/register
```

Body:

```json
{
    "name": "John",
    "email": "john@example.com",
    "password": "MyStrongPassword123"
}
```

Expected:

```json
{
    "success": true,
    "message": "Registration successful",
    "data": {
        "id": 1,
        "name": "John",
        "email": "john@example.com",
        "role": "user"
    }
}
```

### 2. Login

```http
POST http://localhost:3000/api/auth/login
```

Body:

```json
{
    "email": "john@example.com",
    "password": "MyStrongPassword123"
}
```

Expected:

```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "user": {
            "id": 1,
            "name": "John",
            "email": "john@example.com",
            "role": "user"
        },
        "accessToken": "YOUR_ACCESS_TOKEN"
    }
}
```

Postman should also receive the refresh-token cookie.

### 3. Access Protected Profile

```http
GET http://localhost:3000/api/users/profile
```

Header:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### 4. Refresh Access Token

```http
POST http://localhost:3000/api/auth/refresh
```

The browser or Postman should send the refresh-token cookie automatically when its cookie scope matches the request.

### 5. Logout

```http
POST http://localhost:3000/api/auth/logout
```

The backend revokes the refresh token and clears the cookie.

---

# 31. Important Production Improvements for This Project

The example above demonstrates the architecture, but it is not yet a complete production-ready authentication system.

Before deploying it, implement these improvements:

| Area | Required Improvement |
|---|---|
| Registration | Email and password validation |
| Login | Rate limiting and generic errors |
| Password | Argon2id or appropriately configured bcrypt |
| JWT | Strong secret management and short expiration |
| Refresh Token | Atomic rotation and reuse detection |
| Logout | Revoke current device's refresh token |
| Cookies | CSRF defenses and correct cross-origin configuration |
| User Status | Check whether the account is active |
| Authorization | Retrieve current roles and permissions for sensitive actions |
| Database | Use migrations |
| Security | Helmet, CORS configuration, and input validation |
| Monitoring | Authentication event logging |
| Recovery | Password reset and email verification |

**Important implementation details:**

1. The refresh-token association must be initialized before calling `sequelize.sync()`.
2. Refresh-token rotation should be performed transactionally to prevent concurrent refresh requests from creating multiple valid token chains.
3. The example's access JWT remains valid until expiration even after logout. Revoking the refresh token prevents future access-token renewal, but does not immediately revoke an already-issued access token.
4. In a cross-origin frontend/backend setup, configure CORS with explicit allowed origins and `credentials: true` when using cookies. The frontend must also send credentials.
5. Cookie-based refresh endpoints require appropriate CSRF protection.
6. `sequelize.sync()` is for learning; use migrations for production schema management.
7. Do not expose admin role assignment through public registration.

---

# 32. Important Authentication Terminology

| Term | Meaning |
|---|---|
| Authentication | Verifying identity |
| Authorization | Checking access permissions |
| Password Hashing | One-way password transformation |
| Salt | Random value used during hashing |
| bcrypt | Password hashing algorithm/library |
| Argon2id | Password hashing algorithm |
| JWT | JSON Web Token |
| Header | JWT metadata |
| Payload | JWT claims |
| Signature | Verifies token integrity and authenticity |
| Access Token | Credential used to access protected resources |
| Refresh Token | Credential used to obtain new access tokens |
| Session | Server-managed authentication state |
| Cookie | Browser-stored data sent with matching requests |
| HTTP-Only | Prevents JavaScript access to a cookie |
| Secure | Restricts cookie transmission to HTTPS |
| SameSite | Controls cross-site cookie sending |
| Middleware | Function executed during request processing |
| RBAC | Role-Based Access Control |
| Permission | Specific allowed operation |
| OAuth 2.0 | Authorization framework |
| OpenID Connect | Identity layer built on OAuth 2.0 |
| CSRF | Cross-Site Request Forgery |
| XSS | Cross-Site Scripting |
| Token Revocation | Invalidating a credential before its natural expiry |
| Token Rotation | Replacing an existing refresh token with a new one |

---

# 33. Interview Questions and Answers

### Q1. What is authentication?

Authentication is the process of verifying the identity of a user or system.

### Q2. What is authorization?

Authorization determines what an authenticated user is allowed to access or perform.

### Q3. What is the difference between authentication and authorization?

Authentication verifies identity, while authorization checks permissions.

### Q4. What is password hashing?

Password hashing converts a password into a one-way cryptographic hash for secure storage.

### Q5. Why should we hash passwords?

To prevent attackers from obtaining users' original passwords if the database is compromised.

### Q6. What is bcrypt?

bcrypt is a password hashing algorithm and library commonly used for securely storing passwords.

### Q7. What is the difference between encryption and hashing?

Encryption is reversible with the correct key, while password hashing is designed to be one-way.

### Q8. What is a salt?

A salt is a random value added during password hashing to ensure identical passwords produce different hashes.

### Q9. What is JWT?

JWT is a compact token format used to represent claims between parties.

### Q10. What are the three parts of JWT?

- Header.
- Payload.
- Signature.

### Q11. Is JWT encrypted?

A typical signed JWT is not encrypted. Its payload is readable after Base64URL decoding.

### Q12. What is the JWT signature?

The signature allows the receiving party to verify the token's integrity and authenticity.

### Q13. What is the difference between `jwt.decode()` and `jwt.verify()`?

`jwt.decode()` reads the token without verifying its signature. `jwt.verify()` validates the signature and applicable claims.

### Q14. What is an access token?

An access token is a credential used to access protected API resources.

### Q15. What is a refresh token?

A refresh token is a credential used to obtain a new access token.

### Q16. Why should access tokens be short-lived?

Short-lived access tokens reduce the time available for misuse if a token is stolen.

### Q17. What is token rotation?

Token rotation replaces an existing refresh token with a new token whenever it is successfully used.

### Q18. What is session-based authentication?

It is an authentication mechanism where the server stores session information and the client sends a session identifier.

### Q19. What is token-based authentication?

It is an authentication approach where clients send a token that the server verifies.

### Q20. What is a cookie?

A cookie is a small piece of data stored by a browser and sent with matching requests.

### Q21. What is an HTTP-only cookie?

An HTTP-only cookie cannot be accessed through browser JavaScript.

### Q22. What is a Secure cookie?

A Secure cookie is sent only over HTTPS connections.

### Q23. What is SameSite?

SameSite is a cookie attribute that controls whether cookies are sent with cross-site requests.

### Q24. What is authentication middleware?

Authentication middleware verifies credentials before allowing access to protected routes.

### Q25. What is a protected route?

A protected route is an endpoint that requires valid authentication before access is granted.

### Q26. What is RBAC?

RBAC is Role-Based Access Control, where permissions are assigned to roles.

### Q27. What is the difference between 401 and 403?

401 indicates missing or invalid authentication credentials. 403 indicates that the request is understood but access is forbidden.

### Q28. What is OAuth 2.0?

OAuth 2.0 is an authorization framework that allows applications to obtain limited access to protected resources.

### Q29. What is OpenID Connect?

OpenID Connect is an identity layer built on OAuth 2.0 that provides authentication functionality.

### Q30. What is CSRF?

Cross-Site Request Forgery is an attack in which an attacker tricks a user's browser into making an unwanted authenticated request.

### Q31. What is XSS?

Cross-Site Scripting is a vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users.

### Q32. How can JWT be revoked?

Common approaches include token denylists, token versioning, short-lived access tokens, and refresh-token revocation.

### Q33. Should we store JWT in localStorage?

It is possible, but JavaScript-accessible storage exposes tokens to theft through XSS. HTTP-only cookies are often preferable for browser-based authentication when configured with appropriate CSRF protections.

### Q34. Why should we not store passwords in JWT?

JWT payloads are generally readable, so including passwords or other secrets would expose sensitive information.

### Q35. Can JWT be used without a database?

Yes. JWT signature verification can be stateless. However, database access may still be needed for user status, roles, permissions, revocation, and other application requirements.

---

# 34. Phase 11 Cheat Sheet

### Password Hashing

```javascript
const bcrypt = require("bcrypt");

// Hash
const hash = await bcrypt.hash(password, 12);

// Compare
const isMatch = await bcrypt.compare(password, hash);
```

### JWT

```javascript
const jwt = require("jsonwebtoken");

// Generate
const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
);

// Verify
const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
);
```

### Authentication Header

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Cookie

```javascript
res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax"
});
```

### Protected Route

```javascript
router.get(
    "/profile",
    authMiddleware,
    getProfile
);
```

### Role-Based Route

```javascript
router.delete(
    "/users/:id",
    authMiddleware,
    authorizeRoles("admin"),
    deleteUser
);
```

### Status Codes

| Status | Meaning |
|---|---|
| 200 | Successful request |
| 201 | Resource created |
| 400 | Invalid request |
| 401 | Authentication required or invalid |
| 403 | Access forbidden |
| 404 | Resource not found |
| 409 | Conflict |
| 422 | Validation error |
| 500 | Internal server error |

---

# 35. Phase 11 Completion Checklist

Before moving to Phase 12, make sure you can:

- [ ] Explain authentication.
- [ ] Explain authorization.
- [ ] Understand authentication vs authorization.
- [ ] Implement user registration.
- [ ] Implement user login.
- [ ] Understand password hashing.
- [ ] Understand encryption vs hashing.
- [ ] Use bcrypt.
- [ ] Generate JWT tokens.
- [ ] Understand JWT header, payload, and signature.
- [ ] Verify JWT tokens.
- [ ] Understand access tokens.
- [ ] Understand refresh tokens.
- [ ] Implement token-based authentication.
- [ ] Understand session-based authentication.
- [ ] Understand browser cookies.
- [ ] Understand HTTP-only cookies.
- [ ] Understand Secure and SameSite attributes.
- [ ] Create authentication middleware.
- [ ] Protect API routes.
- [ ] Implement RBAC.
- [ ] Understand permission-based authorization.
- [ ] Implement logout.
- [ ] Understand password reset.
- [ ] Understand email verification.
- [ ] Understand OAuth 2.0 and OpenID Connect.
- [ ] Understand CSRF and XSS.
- [ ] Build a complete authentication API.

## Practical Projects

| Project | Concepts |
|---|---|
| Basic Login API | Registration, login, bcrypt |
| JWT Authentication API | Access tokens, protected routes |
| Session Authentication API | Sessions and cookies |
| Role-Based User Management | Admin, manager, user |
| Password Reset System | Reset tokens and email |
| Email Verification System | Verification tokens |
| Social Login System | Google OAuth / OIDC |
| Complete Authentication Backend | All major authentication concepts |

---

# What Comes Next?

## PHASE 12: Error Handling, Validation & Security

In Phase 12, we will learn how to build reliable and secure backend applications.

Topics:

1. Error Handling Fundamentals.
2. Types of Errors.
3. JavaScript Errors.
4. Synchronous Error Handling.
5. Asynchronous Error Handling.
6. try/catch.
7. Custom Error Classes.
8. Centralized Error Handling.
9. Express Error Middleware.
10. Operational vs Programming Errors.
11. Request Validation.
12. Schema Validation.
13. Joi.
14. Zod.
15. Express Validator.
16. Input Sanitization.
17. SQL Injection.
18. NoSQL Injection.
19. Cross-Site Scripting (XSS).
20. Cross-Site Request Forgery (CSRF).
21. CORS.
22. Helmet.
23. Rate Limiting.
24. Brute-Force Protection.
25. Password Security.
26. Environment Variable Security.
27. File Upload Security.
28. API Security Best Practices.
29. Production Error Logging.
30. Building a Secure REST API.

**Most important takeaway from Phase 11:** Authentication verifies who the user is, while authorization determines what the user can do. A secure backend needs both.