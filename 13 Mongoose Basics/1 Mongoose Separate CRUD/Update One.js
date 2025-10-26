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

const Customer = mongoose.model('CUSTOMERS', customerSchema);

const updateCustomer = async () => {
  try {
    const customer = await  Customer.updateOne( { name : "John Doe" }, { $set : { status : "Active"}} );
    console.log('Fetched Customer:', customer);
  } catch (err) {
    console.error('Fetch Error:', err);
  } 
}
updateCustomer();