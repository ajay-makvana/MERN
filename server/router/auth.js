const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello from Server router.js');
});

router.post('/register',(req,res)=>{
    console.log(req.body);
    res.json({message: req.body});
    // res.send("Register from router");
})

module.exports = router;