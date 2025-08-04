import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'

// import products from './data/products.js'
dotenv.config()

import connectDB from './config/db.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import productRoutes from './Routes/productRoutes.js'
import userRoutes from './Routes/userRoutes.js'
import orderRoutes from './Routes/orderRoutes.js'


const port = process.env.PORT || 5001

const app = express()
const __dirname = path.resolve()

//Body Parcer Middleware
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//cookie parser middleware
app.use(cookieParser())

app.use(express.static(path.join(__dirname, '/frontend/build')))

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))


app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
)

app.use(notFound)
app.use(errorHandler)

connectDB()
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})