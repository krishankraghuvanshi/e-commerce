import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/myntraProducts.js'
import User from './Models/userModel.js'
import Product from './Models/productModel.js'
import Order from './Models/orderModel.js'
import connectDB from './config/db.js'


dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUser =  await User.insertMany(users)
        
        const adminUser = createdUser[0]._id

        const sampleProduct = products.map((product)=>{
            return { ...product, user:adminUser};
        })

        await Product.insertMany(sampleProduct)

        console.log("data Imported!".green.inverse)

        process.exit()
    }
    catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('data Destroyed!'.red.inverse)
        process.exit()
    }catch(error){
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}