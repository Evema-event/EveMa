const User = require('../models/user');

exports.verifyUser = (req,res) =>{
    const userName = req.body.userName;
    const emailId = req.body.emailId;
    User.findOne({$or: [{userName: userName}, {emailId: emailId}]})
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

exports.signUp = (req,res) =>{
    const user = new User({
        userName:    req.body.userName,
        emailId:     req.body.emailId,
        password:    req.body.password,
        firstName:   req.body.firstName,
        lastName:    req.body.lastName,
        role:        req.body.role,
        gender:      req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        country:     req.body.country,
        state:       req.body.state,
        cityName:    req.body.cityName,
        zipCode:     req.body.zipCode,
        areaOfInterest: req.body.areaOfInterest,
        Designation:    req.body.Designation,
        companyName:    req.body.companyName,
        companyAddress: req.body.companyAddress,
        contactNumber:  req.body.contactNumber
    });
    user.save().then(user =>{
        res.status(200).json({message: 'Success', user: user});
    }) 
    .catch(err => {
        console.log(err);
        res.status(500).json({message: 'Failed', error: 'Server Error'});
    })    
}