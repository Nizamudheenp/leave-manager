const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');
connectDB();
const cors = require('cors');

app.use(express.json());
app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true
    }
));

const authRoute= require('./routes/authRoutes');
const userRoute= require('./routes/userRoutes');
const adminRoute= require('./routes/adminRoutes');

const port = process.env.PORT;
app.use('/api/auth',authRoute);
app.use('/api/user',userRoute);
app.use('/api/admin',adminRoute);

app.listen(port,()=>{
    console.log(`app listening at port ${port}`);
});
