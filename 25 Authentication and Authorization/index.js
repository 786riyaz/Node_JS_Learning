require('dotenv').config();
const express = require("express");
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_for_dev_only';
const JWT_EXPIRES_IN = '1h'; // adjust as needed

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// simple in-memory user store for demo (replace with DB in production)
const users = new Map();
// create demo user: riyaz@example.com / password: Password123
if (!users.has('riyaz@example.com')) {
  const passwordHash = bcrypt.hashSync('Password123', 10);
  users.set('riyaz@example.com', { email: 'riyaz@example.com', passwordHash, role: 'user' });
}

// helpers
function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 1000, // 1 hour
  };
}

// middleware
function authenticate(req, res, next) {
  try {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    if (!token) return res.status(401).json({ error: 'Authentication required' });
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Authentication required' });
    if (allowedRoles.length && !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}

// Auth endpoints
app.post('/api/auth/register', async (req, res) => {
  const { email, password, role = 'user' } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  if (users.has(email)) return res.status(409).json({ error: 'User already exists' });

  const passwordHash = await bcrypt.hash(password, 10);
  users.set(email, { email, passwordHash, role });
  return res.status(201).json({ message: 'User registered' });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  const user = users.get(email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  const token = createToken({ email: user.email, role: user.role });
  res.cookie('token', token, cookieOptions());
  return res.json({ message: 'Logged in' });
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token', cookieOptions());
  return res.json({ message: 'Logged out' });
});

// Protected endpoints
app.get('/api/balance', authenticate, authorize('user', 'admin'), (req, res) => {
  // example: only return balance for the authenticated user
  if (req.user.email === 'riyaz@example.com') {
    return res.json({ message: `Hello ${req.user.email}`, balance: 786 });
  }
  return res.json({ message: `Hello ${req.user.email}`, balance: 0 });
});

app.get('/api/admin/users', authenticate, authorize('admin'), (req, res) => {
  // admin-only: list users (demo)
  const list = Array.from(users.values()).map(u => ({ email: u.email, role: u.role }));
  return res.json({ users: list });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 786;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});