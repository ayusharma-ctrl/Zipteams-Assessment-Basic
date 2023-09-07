import express from 'express'
import cors from 'cors'
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
//file-imports
import { mongoDB } from './database/database.js';
import userRouter from './routes/user.js';
import donateRouter from './routes/donation.js';


//creates a new instance of an Express application
const app = express();

//setting up config.env file so that we can use content of it
config({
    path: ".env"
})

//connecting server and database
mongoDB();


//<---------------------------- Middlewares ---------------------------->

// 1. we'll be sending data in json format, that's why it is required to use this middleware
app.use(express.json());
// 2. we'll be using dynamic routes, in order to read the data from url we have to use this
app.use(express.urlencoded({ extended: true }));
// 3. to parse HTTP cookies attached to incoming requests
app.use(cookieParser());
// 4. set 'credentials: true' to pass --> headers, cookies, etc to client
app.use(cors({
    origin: [process.env.FRONTEND_URL!],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))


// route splitting
app.use('/api/user', userRouter);
app.use('/api/donate', donateRouter);


// Test Route
app.get("/", (req, res) => {
    return res.send(`<div style = "background:magenta;padding:100px;height:60vh">
    <h2>Welcome to my Server</h2>
    <p>Zipteams FullStack Assignment</p>
    </div>`)
})


// finally server to listen all the http requests
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} Mode.`);
})