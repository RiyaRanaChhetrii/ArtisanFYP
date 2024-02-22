import mongoose from "mongoose"
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from "./data/products.js"
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

// Load environment variables from .env file
dotenv.config()

// Establish connection to the MongoDB database
connectDB()

// Function to import data into the database
const importData = async () => {
    try{
        //Delete existing data
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id
        
        const samplProducts = products.map(product => {
            return { ...product, user: adminUser }
        })

        // Insert the modified products into the database
        await Product.insertMany(samplProducts)

        console.log('Data Imported!'.green.inverse)
        process.exit()
    } catch(error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)

    }
}

// Function to destroy data into the database
const destroyData = async () => {
    try{
        //Delete existing data
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data Destroyed!'.red.inverse)
        process.exit()
    } catch(error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)

    }
}

if(process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}