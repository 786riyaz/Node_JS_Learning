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

const Customer = mongoose.model('customers', customerSchema);

const addManyRecords = async (customersData) => {
  try {
    // const savedCustomers = await Customer.insertMany(customersData);
    const savedCustomers = await Customer.insertMany(customersData, {ordered : false});     //{ ordered: false } to continue inserting remaining documents even if one fails:
    console.log('Customers Added:', savedCustomers);
  } catch (err) {
    console.error('Add Many Records Error:', err);
  } finally {
    mongoose.connection.close();
  }
};

addManyRecords([
  { name: 'John Doe', age: 30, city: 'New York', balance: 1000, emailID: 'john.doe@gmail.com', customerID: 9 },
  { name: 'Jane Smith', age: 28, city: 'Los Angeles', balance: 1500, emailID: 'jane.smith@gmail.com', customerID: 10 },
  { name: 'Robert Brown', age: 35, city: 'Chicago', balance: 800, emailID: 'robert.brown@gmail.com', customerID: 11 }
]);
