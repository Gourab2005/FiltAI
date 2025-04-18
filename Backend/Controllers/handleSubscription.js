const axios = require('axios');
const ApiData = require('../Models/ApiData');
const { User } = require('../Models/User');
const Order = require('../Models/Order');
require('dotenv').config();

const initiatePayment = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const orderId = `order_${Date.now()}`;

    const payload = {
      order_id: orderId,
      order_amount: 99.00,
      order_currency: "INR",
      customer_details: {
        customer_id: user._id.toString(),
        customer_email: user.email,
        customer_phone: "9876543210" 
      }
    };

    const headers = {
      'Content-Type': 'application/json',
      'x-client-id': process.env.CASHFREE_APP_ID,
      'x-client-secret': process.env.CASHFREE_SECRET_KEY,
      'x-api-version': '2022-09-01'
    };

    const response = await axios.post(
      'https://sandbox.cashfree.com/pg/orders',
      payload,
      { headers }
    );

    const order = new Order({
      orderId,
      userId: user._id,
      status: 'PENDING'
    });
    await order.save(); // Save to DB
  
    return res.json({
      success: true,
      paymentSessionId: response.data.payment_session_id,
      message: 'Payment session initiated'
    });

  } catch (error) {
    console.error('Payment initiation error:', error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: 'Payment initiation failed',
      error: error.response?.data || error.message
    });
  }
};

const handlePaymentSuccess = async (req, res) => {
  try {
    const { order_id } = req.body;

    let userId;

    if (req.user) {
      userId = req.user._id;
    } else {
      const order = await Order.findOne({ orderId: order_id });
      if (!order) return; // Already responded in webhook
      userId = order.userId;

      order.status = 'PAID';
      await order.save();
    }

    const user = await User.findById(userId).populate('Apidata');
    if (!user) return;

    if (!user.Apidata || user.Apidata.length === 0) {
      console.error('No API data linked with user:', user._id);
      return;
    }

    const apiData = user.Apidata[0];
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);

    await ApiData.findByIdAndUpdate(apiData._id, {
      subscriptionType: 'Paid',
      subscriptionStartDate: new Date(),
      subscriptionEndDate: endDate,
      activationstatus: true,
      limit: 500
    });

    if (req.user) {
      return res.json({
        success: true,
        message: 'Subscription successful, plan upgraded to Paid'
      });
    }

  } catch (error) {
    console.error('Subscription update error:', error);
    if (req.user) {
      res.status(500).json({ success: false, message: 'Subscription upgrade failed' });
    }
  }
};



module.exports = {
  initiatePayment,
  handlePaymentSuccess
};
