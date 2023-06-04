mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    }
})

// Password hashing

// Hashing the password before saving data on DB in register router so pre() method
// this is middleware so need next what we do after this middleware done
// middleware works after fetching data but before saving it
// also it's returning promise so use async-await
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
})


// (collectionName, Schema)
const User = mongoose.model('USER', userSchema);

module.exports = User;