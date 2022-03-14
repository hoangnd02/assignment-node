import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

import productRoute from '../routes/product';

const app = express();

// middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json())

// route
app.use("/api",productRoute);

// connnect database
mongoose.connect('mongodb://localhost:27017/we16309')
    .then(() => console.log("Kết nối db thành công"))
    .catch((error) => console.log(error));
    
// connection
const PORT = 3001;
app.listen(PORT, () => {
    console.log("Server is running port", PORT);
})