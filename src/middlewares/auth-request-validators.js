const validateUserAuth = (req,res,next) =>{
    if(!req.body.email || !req.body.password) { //if you are not sending email and password then it will not let you move forward
        return res.status(400).json({
            success: false,
            data : {},
            message: 'Something went wrong',
            err: 'Email or password missing in the request'
        });
    }
    next();
}

module.exports ={
    validateUserAuth
}