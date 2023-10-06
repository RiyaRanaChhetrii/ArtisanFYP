// Import the mongoose library for MongoDB interactions
import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = mongoose.Schema({
    // Define a field for the user's name, which is a required string
    name: {
        type: String,
        required: true
    },
    // Define a field for the user's email, which is a required unique string
    email: {
        type: String,
        required: true,
        unique: true
    },
    // Define a field for the user's password, which is a required string
    password: {
        type: String,
        required: true,
    },
    // Define a field for the user's isAdmin status, which is a boolean
    isAdmin: {
        type: Boolean,
        required: true,
        default: false //By default, user is not an admin 
    }
}, {
    timestamps: true // Enable timestamps for automatic createdAt and updatedAt fields
})

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User