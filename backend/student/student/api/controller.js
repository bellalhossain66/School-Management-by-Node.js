const {
    createStudent,
    studentSignIn,
    viewProfile,
    updateProfile,
    passwordCheck,
    updatePass,
    course_fetch_stu,
    course_enroll_insert,
    course_enrolled_fetch,
    course_title_from_id
} = require('./service')
const { genSaltSync, hashSync, compareSync } = require('bcrypt')
const { sign } = require('jsonwebtoken')

module.exports = {
    studentRegistration: (req, res) => {
        const body = req.body
        const salt = genSaltSync(10)
        if (body.first_name != '' && body.last_name != '' && body.email != '' && body.password != '' && body.class != '') {
            body.password = hashSync(body.password, salt)
            body.userId = body.email.split('@')[0]
            createStudent(body, (err, results) => {
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
    studentLogIn: (req, res) => {
        const body = req.body
        if (body.email != '' && body.password != '') {
            studentSignIn(body.email, (err, results) => {
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
                                email: results.email,
                                classNo: results.class
                            },
                            process.env.STU_JWT_SECRET, {
                                expiresIn: '1h'
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
                            message: "This account is banned!"
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
        if (body.first_name != '' && body.last_name != '' && body.userId != '' && body.class != '') {
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
                                    message: "Database connection error",
                                    data: err
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
    },
    course_view_stu: (req, res) => {
        course_fetch_stu((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error!",
                    data: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Course found",
                data: results
            })
        })
    },
    course_enrolled_view: (req, res) => {
        const body = req.params
        course_enrolled_fetch(body.studentId, (err, results) => {
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
                    message: "Empty List"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "data found",
                data: results
            })
        })
    },
    course_title_fetch_from_id: (req, res) => {
        const body = req.params
        course_title_from_id(body.courseId, (err, results) => {
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
                    message: "not found"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Found",
                data: results
            })
        })
    },
    course_enroll_create: (req, res) => {
        const body = req.body
        if (body.courseId != '' && body.studentId != '') {
            course_enroll_insert(body, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error!",
                        data: err
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: 'Course enroll successfully'
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    }
}