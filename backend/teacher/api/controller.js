const {
    createTeacher,
    teacherSignIn,
    viewProfile,
    updateProfile,
    passwordCheck,
    updatePass,
    createCourse,
    create_mcq_question,
    create_mcq_question_option,
    mcq_question_fetch,
    class_name_fetch,
    viewCourse,
    mcq_only_question_fetch,
    mcq_only_question_option_fetch
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
    courseCreate: (req, res) => {
        const body = req.body
        if (body.title != '' && body.class != '' && body.teacherId != '') {
            createCourse(body, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error",
                        data: err
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Course create successfully",
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
    courseView: (req, res) => {
        const body = req.params
        if (body.teacherId != '') {
            viewCourse(body.teacherId, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error",
                        data: err
                    })
                }
                if (!results) {
                    return res.status(404).json({
                        success: 0,
                        message: "Empty course"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Course found",
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
    mcq_question_create: (req, res) => {
        const body = req.body
        if (body.courseId != '' && body.title != '' && body.teacherId != '') {
            create_mcq_question(body, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connetion error",
                        data: err
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "MCQ question successfully created"
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    mcq_question_option_create: (req, res) => {
        const body = req.body
        if (body.sub_title != '' && body.correct != '' && body.ques_Id != '') {
            create_mcq_question_option(body, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error",
                        data: err
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "MCQ question option successfully created"
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    mcq_only_question_view: (req, res) => {
        const body = req.params
        mcq_only_question_fetch(body.courseId, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                    data: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Question found",
                data: results
            })
        })
    },
    mcq_only_question_option_view: (req, res) => {
        const body = req.params
        mcq_only_question_option_fetch(body.questionId, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                    data: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Question Option found",
                data: results
            })
        })
    },
    mcq_question_view: (req, res) => {
        const body = req.body
        mcq_question_fetch(body.courseId, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                    data: err
                })
            }
            var questionId = 0
            var questionIdCheck = 0
            for (var i = 0; i < results.length; i += 4) {
                questionId = results[i].questionId
                if (questionId != questionIdCheck) {
                    results[i].MCQ_option = [{
                        question_optionId: results[i].question_optionId,
                        sub_title: results[i].sub_title,
                        ques_Id: results[i].ques_Id,
                        correct: results[i].correct
                    }, {
                        question_optionId: results[i + 1].question_optionId,
                        sub_title: results[i + 1].sub_title,
                        ques_Id: results[i + 1].ques_Id,
                        correct: results[i + 1].correct
                    }, {
                        question_optionId: results[i + 2].question_optionId,
                        sub_title: results[i + 2].sub_title,
                        ques_Id: results[i + 2].ques_Id,
                        correct: results[i + 2].correct
                    }, {
                        question_optionId: results[i + 3].question_optionId,
                        sub_title: results[i + 3].sub_title,
                        ques_Id: results[i + 3].ques_Id,
                        correct: results[i + 3].correct
                    }]
                } else {
                    delete results[i]
                }
                questionIdCheck = results[i].questionId
            }
            return res.status(200).json({
                success: 1,
                message: "Question & option list",
                question: results
            })
        })
    },
    class_name_view: (req, res) => {
        class_name_fetch((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database error connection",
                    data: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "data found",
                data: results
            })
        })
    }
}