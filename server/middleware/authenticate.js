const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const varifyToken = jwt.verify(token, process.env.SECRET_KEY);

        // varifyToken has User's all details
        console.log(varifyToken);

        // finding details that user with this token exist or not
        const rootUser = await User.findOne({ _id: varifyToken._id, "tokens.token": token });

        if (!rootUser) {
            throw new Error("User not found");
        }

        // Help in frontEnd for showing details of User
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        // middleware so next() must be at end of it;
        next();
    }
    catch (err) {
        res.status(401).send("Unauthorised: No token provided");
        console.log(err);
    }
}

module.exports = authenticate;