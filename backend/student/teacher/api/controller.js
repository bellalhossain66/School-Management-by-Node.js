const {
    createTeacher,
    teacherSignIn,
    viewProfile,
    updateProfile,
    passwordCheck,
    updatePass
} = require('./service')
const { genSaltSync, hashSync, compareSync } = require('bcrypt')
const { sign } = require('jsonwebtoken')

module.exports = {
    teacherRegistration: (req, res) => {
        const body = req.body
        if (body.first_name != '' && body.last_name != '' && body.email != '' && body.password != '') {
            const salt = genSaltSync(10)
            body.password = hashSync(body.password, salt)
            body.userId = body.email.split('@')[0]
            createTeacher(body, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error!",
                        data: err
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Registration successfull",
                    data: results
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    teacherLogIn: (req, res) => {
        const body = req.body
        if (body.email != '' && body.password != '') {
            teacherSignIn(body.email, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error!",
                        data: err
                    })
                }
                if (!results) {
                    return res.status(404).json({
                        success: 0,
                        message: "Invalid email or password"
                    })
                }
                const result = compareSync(body.password, results.password)
                if (result) {
                    if (results.action == 0) {
                        const jwtoken = sign({
                                first_name: results.first_name,
                                last_name: results.last_name,
                                userId: results.userId,
                                email: results.email
                            },
                            process.env.TEACHER_JWT_SECRET, {
                                expiresIn: '10h'
                            }
                        )
                        res.cookie('log_token', jwtoken)
                        res.cookie('logCheck', true)
                        return res.status(200).json({
                            success: 1,
                            message: "Login successful"
                        })
                    } else {
                        return res.json({
                            success: 0,
                            message: "This account is banned"
                        })
                    }
                } else {
                    return res.status(404).json({
                        success: 0,
                        message: "Invalid email or password"
                    })
                }
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    profileView: (req, res) => {
        const body = req.params
        viewProfile(body.userId, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error!",
                    data: err
                })
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "Not found"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Data found",
                data: results
            })
        })
    },
    profileUpdate: (req, res) => {
        const body = req.body
        if (body.first_name != '' && body.last_name != '' && body.userId != '') {
            updateProfile(body, (err, results) => {
                if (err) {
                    res.status(500).json({
                        success: 0,
                        message: "Database connetion error",
                        data: err
                    })
                }
                res.status(200).json({
                    success: 1,
                    message: "Successfully updated"
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    passwordUpdate: (req, res) => {
        const body = req.body
        if (body.password != '' && body.con_password != '' && body.userId != '' && body.old_password != '') {
            if (body.password == body.con_password) {
                passwordCheck(body.userId, (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            message: "Database connetion error",
                            data: err
                        })
                    }
                    if (!results) {
                        return res.status(404).json({
                            success: 0,
                            message: "Please login"
                        })
                    }
                    const result = compareSync(body.old_password, results.password)
                    if (result) {
                        const salt = genSaltSync(10)
                        body.password = hashSync(body.password, salt)
                        updatePass(body, (err, results) => {
                            if (err) {
                                return res.status(500).json({
                                    success: 0,
                                    message: "Database connection error"
                                })
                            }
                            return res.status(200).json({
                                success: 1,
                                message: "Password update successful"
                            })
                        })
                    } else {
                        return res.json({
                            success: 0,
                            message: "Old password invalid"
                        })
                    }
                })
            } else {
                return res.json({
                    success: 0,
                    message: "Confirm password doesnt match"
                })
            }
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    }
}