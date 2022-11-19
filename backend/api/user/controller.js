const {
    check_mail,
    check_phone,
    createStudent,
    studentSignIn,
    viewProfile,
    updateProfile,
    passwordCheck,
    updatePass,
    question_bank_fetch,
    question_bank_option_fetch,
    question_bank_mcq_fetch,
    subjective_fetch,
    subjective_category_fetch,
    subjective_sub_category_fetch,
    subjective_mcq_fetch,
    examination_fetch,
    examination_option_fetch,
    examination_mcq_fetch,
    examination_option_fetch_running,
    examination_option_fetch_upcoming,
    examination_option_fetch_archive,
    personal_practice_answer_last_id,
    personal_practice_answer_insert,
    personal_practice_answer_fetch,
    preparation_practice_answer_last_id,
    preparation_practice_answer_insert,
    preparation_practice_answer_fetch,
    preparation_option_answer_sheet_fetch,
    user_packages_list
} = require('./service')
const { genSaltSync, hashSync, compareSync } = require('bcrypt')
const { sign } = require('jsonwebtoken')

module.exports = {
    student_registration: (req, res) => {
        const body = req.body
        const salt = genSaltSync(10)
        if (body.name != '' && body.phone != '' && body.email != '' && body.password != '' && body.confirm_password != '') {
            if (body.password === body.confirm_password) {
                check_mail(body, (err, result_check) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error!"
                        })
                    }
                    if (!result_check) {
                        check_phone(body, (err, result_check_2) => {
                            if (err) {
                                return res.status(500).json({
                                    success: 0,
                                    message: "Database connection error!"
                                })
                            }
                            if (!result_check_2) {
                                body.password = hashSync(body.password, salt)
                                body.userId = body.email.split('@')[0]
                                createStudent(body, (err, results) => {
                                    if (err) {
                                        return res.status(500).json({
                                            success: 0,
                                            message: "Database connection error!"
                                        })
                                    }
                                    return res.status(200).json({
                                        success: 1,
                                        message: "Registration successfull"
                                    })
                                })
                            } else {
                                return res.json({
                                    success: 0,
                                    message: "Phone number already taken"
                                })
                            }
                        })
                    } else {
                        return res.json({
                            success: 0,
                            message: "Email already taken"
                        })
                    }
                })
            } else {
                return res.json({
                    success: 0,
                    message: "Password don't match"
                })
            }
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
                        message: "Database connection error!"
                    })
                }
                if (!results) {
                    return res.status(200).json({
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
                                userId: results.userId
                            },
                            process.env.STU_JWT_SECRET, {
                                expiresIn: '10h'
                            }
                        )
                        res.cookie('log_token', jwtoken)
                        res.cookie('logCheck', true)
                        return res.status(200).json({
                            success: 1,
                            message: "Login successful",
                            userId: results.userId
                        })
                    } else {
                        return res.json({
                            success: 0,
                            message: "This account is banned!"
                        })
                    }
                } else {
                    return res.status(200).json({
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
        const body = req.body
        viewProfile(body.userId, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error!"
                })
            }
            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "Not found"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "User found",
                data: results
            })
        })
    },
    profile_update: (req, res) => {
        const body = req.body
        if (body.userId != '' && body.name != '') {
            updateProfile(body, (err, results) => {
                if (err) {
                    res.status(500).json({
                        success: 0,
                        message: "Database connetion error"
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
    password_update: (req, res) => {
        const body = req.body
        if (body.userId != '' && body.old_password != '' && body.new_password != '' && body.confirm_password != '') {
            if (body.new_password == body.confirm_password) {
                passwordCheck(body.userId, (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            message: "Database connetion error"
                        })
                    }
                    if (!results) {
                        return res.status(200).json({
                            success: 0,
                            message: "Please login"
                        })
                    }
                    if (compareSync(body.old_password, results.password)) {
                        const salt = genSaltSync(10)
                        body.new_password = hashSync(body.new_password, salt)
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
                    message: "Confirm password doesn't match"
                })
            }
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    question_bank: (req, res) => {
        question_bank_fetch((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                    data: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Data found",
                data: results
            })
        })
    },
    question_bank_option: (req, res) => {
        if (req.body.question_bank_id != '') {
            question_bank_option_fetch(req.body.question_bank_id, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Data found",
                    data: results
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields required"
            })
        }
    },
    question_bank_mcq: (req, res) => {
        if (req.body.question_bank_option_id != '') {
            question_bank_mcq_fetch(req.body.question_bank_option_id, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (results.length == 0) {
                    return res.json({
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
        } else {
            return res.json({
                success: 0,
                message: "Fields required"
            })
        }
    },
    subjective: (req, res) => {
        subjective_fetch((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Data found",
                data: results
            })
        })
    },
    subjective_category: (req, res) => {
        const body = req.body
        if (body.subjective_id != '') {
            subjective_category_fetch(body.subjective_id, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (results.length == 0) {
                    subjective_mcq_fetch(body.subjective_id, (errr, results_mcq) => {
                        if (errr) {
                            return res.status(500).json({
                                success: 0,
                                message: "Database connection error"
                            })
                        }
                        if (results_mcq.length == 0) {
                            return res.json({
                                success: 0,
                                message: "Not found"
                            })
                        }
                        return res.status(200).json({
                            success: 1,
                            message: "Category not found. But MCQ found here.",
                            category: [],
                            questions: results_mcq
                        })
                    })
                } else {
                    return res.status(200).json({
                        success: 1,
                        message: "Data found",
                        category: results,
                        questions: []
                    })
                }
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields required"
            })
        }
    },
    subjective_sub_category: (req, res) => {
        if (req.body.subjective_category_id != '') {
            subjective_sub_category_fetch(req.body.subjective_category_id, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Data found",
                    data: results
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields required"
            })
        }
    },
    subjective_mcq: (req, res) => {
        if (req.body.subjective_sub_category_id != '') {
            subjective_mcq_fetch(req.body.subjective_sub_category_id, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Data found",
                    data: results
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields required"
            })
        }
    },
    examination: (req, res) => {
        examination_fetch((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Data found",
                data: results
            })
        })
    },
    examination_option: (req, res) => {
        const body = req.body
        if (body.examination_id != '' && body.status !== '' && body.userId != '') {
            if (body.status === 'All' || body.status === 'all') {
                examination_option_fetch(body, (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        })
                    }
                    if (results.length == 0) {
                        return res.json({
                            success: 0,
                            message: "Data not found"
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Data found",
                        data: results
                    })
                })
            } else if (body.status === 'Running' || body.status === 'running') {
                examination_option_fetch_running(body, (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        })
                    }
                    if (results.length == 0) {
                        return res.json({
                            success: 0,
                            message: "Running data not found"
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Data found",
                        data: results
                    })
                })
            } else if (body.status === 'Upcoming' || body.status === 'upcoming') {
                examination_option_fetch_upcoming(body, (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        })
                    }
                    if (results.length == 0) {
                        return res.json({
                            success: 0,
                            message: "Upcoming data not found"
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Data found",
                        data: results
                    })
                })
            } else if (body.status === 'Archive' || body.status === 'archive') {
                examination_option_fetch_archive(body, (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        })
                    }
                    if (results.length == 0) {
                        return res.json({
                            success: 0,
                            message: "Archive data not found"
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Data found",
                        data: results
                    })
                })
            } else {
                return res.json({
                    success: 0,
                    message: "Status invalid. Status:`All/all` || `Running/running` || `Upcoming/upcoming`, || `Archive/archive`"
                })
            }
        } else {
            return res.json({
                success: 0,
                message: "Fields required"
            })
        }
    },
    examination_mcq: (req, res) => {
        if (req.body.examination_option_id != '') {
            examination_mcq_fetch(req.body.examination_option_id, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (results.length == 0) {
                    return res.json({
                        success: 0,
                        message: "Not found"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Data found",
                    questions: results
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields required"
            })
        }
    },
    personal_practice_answer: (req, res) => {
        const body = req.body
        if (body.userId != '' && body.question_id != '' && body.question_title != '' && body.total_mcq != '' && body.total_mcq_marked != '' && body.total_right != '' && body.total_wrong != '' && body.total_marks != '') {
            personal_practice_answer_last_id((err, results_id) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (!results_id) {
                    body.pas_id = 'pas-01'
                } else {
                    body.pas_id = 'pas-0' + (results_id.id + 1)
                }
                personal_practice_answer_insert(body, (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        })
                    }
                    return res.json({
                        success: 1,
                        message: "Successful"
                    })
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields required"
            })
        }
    },
    personal_practice_answer_sheet: (req, res) => {
        const body = req.body
        if (body.userId != '') {
            personal_practice_answer_fetch(body, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (results.length == 0) {
                    return res.json({
                        success: 0,
                        message: "Empty answer sheet"
                    })
                }
                return res.json({
                    success: 1,
                    message: "Answer sheet found",
                    answer: results
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields required"
            })
        }
    },
    preparation_practice_answer: (req, res) => {
        const body = req.body
        if (body.userId != '' && body.question_id != '' && body.question_title != '' && body.total_mcq != '' && body.total_mcq_marked != '' && body.total_right != '' && body.total_wrong != '' && body.total_marks != '') {
            preparation_practice_answer_last_id((err, results_id) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (!results_id) {
                    body.pas_id = 'pre-as-01'
                } else {
                    body.pas_id = 'pre-as-0' + (results_id.id + 1)
                }
                preparation_practice_answer_insert(body, (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        })
                    }
                    return res.json({
                        success: 1,
                        message: "Successful"
                    })
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields required"
            })
        }
    },
    preparation_practice_answer_sheet: (req, res) => {
        const body = req.body
        if (body.userId != '') {
            preparation_practice_answer_fetch(body, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (results.length == 0) {
                    return res.json({
                        success: 0,
                        message: "Empty answer sheet"
                    })
                }
                return res.json({
                    success: 1,
                    message: "Answer sheet found",
                    answer: results
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields required"
            })
        }
    },
    preparation_option_answer_sheet: (req, res) => {
        const body = req.body
        if (body.userId != '' && body.examination_option_id != '') {
            preparation_option_answer_sheet_fetch(body, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (!results) {
                    return res.json({
                        success: 0,
                        message: "Not participated yet"
                    })
                }
                return res.json({
                    success: 1,
                    message: "Participated",
                    question_result: results
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields required"
            })
        }
    },
    user_packages_list: (req, res) => {
        const body = req.body
        if (body.userId != '') {
            user_packages_list(body.userId, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (results.length == 0) {
                    return res.json({
                        success: 0,
                        message: "Package not found"
                    })
                }
                return res.json({
                    success: 1,
                    message: "Package found",
                    package: results
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields required"
            })
        }
    }
}