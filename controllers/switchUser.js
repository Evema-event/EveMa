const User = require("../models/user")

const throwError = require('../utility/throwError')

const bcrypt = require('bcryptjs');

exports.switchUser = (req, res) => {
    let loadedUser
    let existingRole
    User.findById(req.userId)
        .then((user) => {
            existingRole = user.role[0]
            if (user.role.length >= 2) {
                const error = new Error('Two accounts already exist')
                error.statusCode = 409
                throw error
            }
            loadedUser = user
            return user
        })
        .then((user) => {
            return bcrypt.compare(req.body.password, user.password)
        })
        .then((isMatch) => {
            if (isMatch) {
                if (existingRole === 'Visitor') {
                    loadedUser.role.push('Exhibitor')
                }
                else {
                    loadedUser.role.push('Visitor')
                }
            }
            else {
                const error = new Error('Password does not match')
                error.statusCode = 401
                throw error
            }
            loadedUser.save()
            res.status(200).json({ message: 'Success', user: loadedUser.role })
        })

        .catch((err) => {
            return throwError(err, res)
        })
}