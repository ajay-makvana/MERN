mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

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
    },
    // token storing on DB
    // same user login many time so need array of tokens as many tokens 
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
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

// Generating token
// methods defining for generation of token on userSchema
userSchema.methods.generateAuthToken = async function () {
    try {
        // jsw.sign(payload, secretOrPrivateKey, [options, callback])
        // payload must be unique
        // _id is from DB which is always unique
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        // adding token in tokens in DB
        this.tokens = this.tokens.concat({ token: token });
        // save the details (added token) 
        await this.save();
        // return this so in auth.js we can use
        return token;
    }
    catch (err) {
        console.log(err);
    }
}

// collection creation
// (collectionName, Schema)
const User = mongoose.model('USER', userSchema);

module.exports = User;