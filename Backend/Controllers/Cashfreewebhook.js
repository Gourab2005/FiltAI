const { handlePaymentSuccess } = require("./handleSubscription");

const cashfreeWebhook = async (req, res) => {
  try {
    console.log('✅ Webhook Received');
    console.log('Webhook Data:', req.body);

    const data = req.body.data;

    // Correctly extract values from nested data object
    const order_id = data?.order?.order_id;
    const payment_status = data?.payment?.payment_status;

    // Always respond first to avoid timeout
    res.status(200).send('Webhook received');

    if (payment_status === 'SUCCESS') {
      const clonedReq = { ...req, body: { order_id } };
      const clonedRes = {
        json: () => {},
        status: () => ({ json: () => {} })
      };

      await handlePaymentSuccess(clonedReq, clonedRes);
      console.log('✅ Webhook processing completed for order_id:', order_id);
    } else {
      console.log('⚠️ Payment not successful. Status:', payment_status);
    }

  } catch (err) {
    console.error('❌ Webhook processing error:', err);
  }
};

module.exports = cashfreeWebhook;
