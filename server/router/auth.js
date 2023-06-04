const express = require('express');
const router = express.Router();

require('../db/conn');
const User = require("../model/userSchema");

router.get('/', (req, res) => {
    res.send('Hello from Server router.js');
});

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
//                 return res.status(200).json({ error: "User created succesfully" });
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

        // key value pair to store in database
        const user = new User({ name: name, email: email, phone: phone, work: work, password: password, cpassword: cpassword });

        const userRegistered = await user.save();

        if (userRegistered) {
            return res.status(201).json({ error: "User created succesfully" });
        }
        else {
            res.status(500).json({ error: "Failed to Register" });
        }
    }
    catch {
        console.log(err);
    }

});

module.exports = router;