const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.auth = (req, res, next) => {
    try {
        const token = req.body.token;

        if (!token) {
            return res.status(403).json({
                success: false,
                message: 'Token is missing'
            });
        }


        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'token is invalid'
            })

        }
        next();
    } catch (error) {

                return res.status(401).json({
                    success: false,
                    message: 'something went wrong'
                })
    }
}


exports.isStudent = (req, res, next) => {
    try {
        if(req.user.profile !== "Student"){
            return res.status(200).json({
                success: true,
                message: "Welcome to the Protected Routes for Student"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong"

        });
    }
    next();
}


exports.isAdmin = (req, res, next) => {
    try {
        if(req.user.profile !== "Admin"){
            return res.status(200).json({
                success: true,
                message:"Welcome to the Protected Routes for Admin"
            });
        };
    } catch (error) {

        return res.status(500).json({
            success: false,
            message:"someting Went Wrong"
        });
        
    }
    next();
}

