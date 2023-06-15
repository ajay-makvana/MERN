const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const cookieParser = require('cookie-parser');

require('../db/conn');
const User = require("../model/userSchema");

router.get('/', (req, res) => {
    res.send('Hello from Server router.js');
});

// need to add cookie-parser miiddleware as Express doesn't parse request cookie headers by default
router.use(cookieParser());

// Using Promise

// router.post('/register', (req, res) => {
//     console.log(req.body);
//     // console.log(req.body.name+" "+req.body.email);
//     // res.json({message: req.body});
//     // res.send("Register from router");
//     const { name, email, phone, work, password, cpassword } = req.body;
//     // console.log(name+" "+email);
//     if (!name || !email || !phone || !work || !password || !cpassword) {
//         // return res.json({error:"fill all details properly"});
//         return res.status(422).json({ error: "fill all details properly" });
//     }

//     // finding as any user with same email exist on database or not
//     // database email: user filled email
//     User.findOne({ email: email })
//         .then((userExist) => {
//             if (userExist) {
//                 return res.status(422).json({ error: "Email already exist" });
//             }

//             // key value pair to store in database
//             const user = new User({ name: name, email: email, phone: phone, work: work, password: password, cpassword: cpassword });
//             user.save().then(() => {
//                 return res.status(200).json({ message: "User created succesfully" });
//             }).catch((err) => {
//                 res.status(500).json({ error: "Failed to Register" });
//             })

//         }).catch((err => {
//             console.log(err);
//         }));

// });


// Using Async-Await 

router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "fill all details properly" });
    }

    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email already exist" });
        }
        else if (password != cpassword) {
            return res.status(422).json({ error: "password and cPassword anr not same" });
        }
        else {
            // key value pair to store in database
            const user = new User({ name: name, email: email, phone: phone, work: work, password: password, cpassword: cpassword });
            // Hashing precess define in userSchema will work here
            // as we mentioned pre() method before 'save' works
            const userRegistered = await user.save();

            if (userRegistered) {
                return res.status(201).json({ message: "User created succesfully" });
            }
            else {
                res.status(500).json({ error: "Failed to Register" });
            }
        }
    }
    catch (err) {
        console.log(err);
    }

});

// Login router
router.post('/signin', async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please Fill Data" });
        }

        // findOne() return entire document if email match
        const userLogin = await User.findOne({ email: email });

        if (userLogin) {

            // password compare with it's hash stored on DB 
            const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();
            console.log(token);

            // storing token in Cookie
            res.cookie("jwtoken", token, {
                // expires token after 30 days(all in milli seconds)
                expires: new Date(Date.now() + 25892000000),
                // work on http, without it not work in only http
                httpOnly: true
            });

            if (isMatch) {
                res.json({ message: "User signin successfully" });
            }
            else {
                res.status(400).json({ error: "Invalid Credentials" });
            }
        }
        else {
            res.status(400).json({ error: "Invalid Credentials" });
        }
    }
    catch (err) {
        console.log(err);
    }
});

// about page only open when user is loggedIn and has unique token id(jwttoken in cookie)
router.get('/about', authenticate, (req, res) => {
    // whatever rootUser details get from authenticate middleware send to response in frontEnd 
    res.send(req.rootUser);
    console.log('Hello from About Inside Router');
});

// for getting user data in home & contact page
router.get('/getdata', authenticate, (req, res) => {
    res.send(req.rootUser);
});

//contact page message handling
router.post('/contact', authenticate, async (req, res) => {
    try {

        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            console.log("some field empty in contact form");
            return res.status(400).json({ error: "Please fill all field of contact form" });
        }

        // req.userID from authenticate middleware
        const userContact = await User.findOne({ _id: req.userID });

        if (userContact) {
            // addMessage method defined in userSchema
            const userMessage = await userContact.addMessage(name, email, phone, message);

            await userContact.save();

            res.status(201).json({ message: "user contact form succesfully" });
        }
    }
    catch (err) {
        console.log(err);
    }
});

module.exports = router;