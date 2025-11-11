const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/amazon')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('Connection Error:', err));

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  city : String,
  balance: Number,
  emailID: { type: String, required: true, unique: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  customerID: { type: Number, required: true, unique: true },
  lastModified: { type: Date, default: Date.now }
});

// const Customer = mongoose.model('customers', customerSchema);
// const Customer = mongoose.model('customer', customerSchema);
// const Customer = mongoose.model('Customer', customerSchema);
// const Customer = mongoose.model('Customers', customerSchema);
const Customer = mongoose.model('CUSTOMERS', customerSchema);

Customer.find()
  .then(customers => console.log('All Customers:', customers))
  .catch(err => console.error('Find Error:', err));