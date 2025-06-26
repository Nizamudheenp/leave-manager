const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');
connectDB();

app.use(express.json());

const authRoute= require('./routes/authRoutes');

const port = process.env.PORT;
app.use('/api/auth',authRoute);

app.listen(port,()=>{
    console.log(`app listening at port ${port}`);
});
