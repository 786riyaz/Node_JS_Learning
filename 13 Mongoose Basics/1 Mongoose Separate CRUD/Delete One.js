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

const deleteCustomer = async () => {
  try {
    const customer = await  Customer.deleteOne( { _id : "68fc97bd5a2ab2971d553b41" });
    console.log('Deleted Customer:', customer);
  } catch (err) {
    console.error('Fetch Error:', err);
  } 
}
deleteCustomer();