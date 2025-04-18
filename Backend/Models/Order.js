const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    default: 'PENDING'
  }
});

module.exports = mongoose.model('Order', orderSchema);
