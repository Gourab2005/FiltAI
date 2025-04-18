require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
require('./Connections/DB');
const UserRouter = require('./Routes/User');
const APIRouter = require('./Routes/API')
const cors = require('cors');
const cashfreeWebhook = require('./Controllers/Cashfreewebhook');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/user',UserRouter);
app.use('/api/service',APIRouter);
app.post('/api/cashfree/webhook',cashfreeWebhook);
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})