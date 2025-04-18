const express = require("express");
const { AuthValidator } = require("../Middlewares/AuthValidator");
const { generateApiKey } = require("../Controllers/apigenerator");
const { ApiCallHandler, callAPI } = require("../Middlewares/ApiCallHandler");
const { initiatePayment } = require("../Controllers/handleSubscription");
const cashfreeWebhook = require("../Controllers/Cashfreewebhook");
const router = express.Router();

router.post('/generate-api',AuthValidator,generateApiKey);
router.post('/subscribe', AuthValidator, initiatePayment);
router.post('/payment-success',cashfreeWebhook);
router.post('/AgentResponse',ApiCallHandler,callAPI);
module.exports = router