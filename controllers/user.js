const User = require('../models/user');

exports.verifyUser = (req,res) =>{
    const userName = req.body.userName;
    const emailId = req.body.emailId;
    User.findOne({userName: userName, emailId: emailId})
    .then(user =>{
        if(user){
            res.status(409).json({message: 'Failed', error: 'Username or Email already exist!'});
        }
        res.status(200).json({message: 'Success'});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: 'Failed', error: 'Server Error'});
    })
};