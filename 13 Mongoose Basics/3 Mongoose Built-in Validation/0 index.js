const mongoose = require('mongoose');

// Add connection options
mongoose.connect('mongodb://localhost:27017/amazon')
.then(() => console.log('MongoDB Connected'))
.catch(err => {
  console.error('Connection Error:', err);
  process.exit(1); // Exit if cannot connect
});

// Handle connection events
mongoose.connection.on('error', err => {
  console.error('MongoDB error:', err);
});

const customerSchema = new mongoose.Schema({
  // String with trim, required, minlength, maxlength
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters'],
    maxlength: [50, 'Name must be at most 50 characters']
  },

  // Number with required, min, max
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [0, 'Age cannot be negative'],
    max: [120, 'Age seems unrealistic']
  },

  // Optional string with trim and maxlength
  city: { 
    type: String,
    trim: true,
    maxlength: [100, 'City name too long']
  },

  // Number with min and default
  balance: {
    type: Number,
    min: [0, 'Balance cannot be negative'],
    default: 0
  },

  // Email with required, unique, lowercase and regex match
  emailID: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/, 'Please enter a valid email']
  },

  // Mobile number: optional, must be exactly 10 digits
  mobile: {
    type: String,
    required: false,
    trim: true,
    match: [/^\d{10}$/, 'Mobile number must be exactly 10 digits'],
    minlength: [10, 'Mobile number must be 10 digits'],
    maxlength: [10, 'Mobile number must be 10 digits']
  },

  // Enum with default
  status: { 
    type: String, 
    enum: {
      values: ['Active', 'Inactive', 'Pending'],
      message: 'Status must be Active, Inactive, or Pending'
    },
    default: 'Active' 
  },

  // Required unique number with min
  customerID: { 
    type: Number, 
    required: [true, 'CustomerID is required'], 
    unique: true,
    min: [1, 'CustomerID must be >= 1']
  },

  // Date with default
  lastModified: { 
    type: Date, 
    default: Date.now 
  },

  // Boolean with default
  isVerified: {
    type: Boolean,
    default: false
  },

  // Password with minlength/maxlength and trim
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true,
    minlength: [8, 'Password must be at least 8 characters'],
    maxlength: [128, 'Password too long'],
    select: false
  },

  // Array of strings with a simple validator (max items)
  tags: {
    type: [String],
    validate: {
      validator: arr => arr.length <= 5,
      message: 'Maximum 5 tags allowed'
    }
  },

  // Subdocument with its own validations
  address: {
    street: { type: String, trim: true, maxlength: [200, 'Street too long'] },
    zip: { type: String, match: [/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'] },
    country: { type: String, enum: ['USA', 'Canada', 'Other'], default: 'USA' }
  }
});

const Customer = mongoose.model('Customer', customerSchema);

// Plain object (not a mongoose document) passed into addRecord
const newCustomerData = { 
  name: 'John Doe', 
  age: 30, 
  city: 'New York', 
  balance: 1000, 
  emailID: 'john.doe@gmail.com', 
  mobile: '1234567890',
  customerID: 9,
  password: 's3cur3P@ssw0rd',
  tags: ['premium','newsletter'],
  address: { street: '123 Main St', zip: '10001', country: 'USA' }
};

const addRecord = async (customerData) => {
  try {
    const customer = new Customer(customerData);  
    const savedCustomer = await customer.save();
    console.log('Customer Added:', savedCustomer);
  } catch (err) {
    console.error('Add Record Error:', err);
  } finally {
    // Consider closing the connection after operation
    await mongoose.connection.close();
  }
};

// Execute and handle the promise
addRecord(newCustomerData)
  .catch(err => console.error('Execution error:', err));