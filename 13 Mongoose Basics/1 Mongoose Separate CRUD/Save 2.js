const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/amazon')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('Connection Error:', err));

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number, city : String, balance: Number, 
  emailID: { type: String, required: true, unique: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  customerID: { type: Number, required: true, unique: true },
  lastModified: { type: Date, default: Date.now }
});

const Customer = mongoose.model('customers', customerSchema);

const addRecord = async (customerData) => {
  try {
    const customer = new Customer(customerData);
    const savedCustomer = await customer.save();
    console.log('Customer Added:', savedCustomer);
  } catch (err) {
    console.error('Add Record Error:', err);
  } finally {
    mongoose.connection.close();
  }
};

addRecord({ name: 'John Doe', age: 30, city: 'New York', balance: 1000, emailID: 'john.doe@gmail.com', customerID: 9 });
