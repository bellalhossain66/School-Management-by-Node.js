const {
    subject_last_id,
    add_subject_insert,
    all_subject_fetch,
    category_last_id,
    add_category_insert,
    all_category_fetch,
    sub_category_last_id,
    sub_add_category_insert,
    all_sub_category_fetch,
    delete_sub_category,
    delete_category,
    delete_subject,
    question_last_id,
    add_question_insert,
    add_option_insert,
    all_mcq_question_fetch,
    all_mcq_question_option_fetch,
    delete_mcq_question,
    mcq_by_question_fetch,
    mcq_by_question_option_fetch,
    question_bank_category_last_id,
    add_question_bank_category_insert,
    all_question_bank_category_fetch,
    question_bank_sub_category_last_id,
    add_question_bank_sub_category_insert,
    all_question_bank_sub_category_fetch,
    delete_question_bank_sub_category,
    delete_question_bank_category,
    question_bank_by_name_fetch,
    question_bank_mcq_last_id,
    question_bank_mcq_insert,
    question_bank_mcq_fetch,
    question_bank_mcq_delete,
    subjective_question_by_name_fetch,
    preparation_category_last_id,
    add_preparation_category_insert,
    all_preparation_category_fetch,
    preparation_sub_category_last_id,
    add_preparation_sub_category_insert,
    all_preparation_sub_category_fetch,
    delete_preparation_sub_category,
    delete_preparation_category,
    preparation_exam_by_name_fetch,
    preparation_eaxm_mcq_fetch,
    preparation_eaxm_mcq_last_id,
    preparation_eaxm_mcq_insert,
    preparation_eaxm_mcq_delete,
    all_user_fetch,
    user_active_inactive_by,
    user_delete_by,
    all_user_deleted_fetch,
    user_delete_forever_by,
    user_restore_by,
    notice_board_fetch,
    add_notice_board_insert,
    update_package_info,
    package_subscriber_by_name_fetch,
    package_subscriber_fetch,
    package_subscriber_active_inactive_by,
    add_package_payment_insert,
    package_payment_last_id,
    all_package_payment_fetch,
    package_payment_active_inactive_by,
    delete_package_payment,
    question_bank_mcq_by_question_fetch,
    preparation_eaxm_mcq_by_question_fetch,
    create_new_package,
    package_last_id,
    package_all_list,
    old_package_update
} = require('./server')

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

module.exports = {
    add_subject: (req, res) => {
        if (req.body.title != '') {
            subject_last_id((err, results_id) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (!results_id) {
                    req.body.subject_id = 'subject-01'
                } else {
                    req.body.subject_id = 'subject-0' + (results_id.id + 1)
                }
                add_subject_insert(req.body, (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Successfully Added"
                    })
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    all_subject: (req, res) => {
        all_subject_fetch((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            if (results.length == 0) {
                return res.status(404).json({
                    success: 0,
                    message: "Not found"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Subject found",
                data: results
            })
        })
    },
    add_category: (req, res) => {
        if (req.body.title != '' && req.body.subject_id != '') {
            category_last_id((err, results_id) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (!results_id) {
                    req.body.category_id = 'category-01'
                } else {
                    req.body.category_id = 'category-0' + (results_id.id + 1)
                }
                add_category_insert(req.body, (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Successfully Added"
                    })
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    all_category: (req, res) => {
        if (req.params.subject_id != '') {
            all_category_fetch(req.params.subject_id, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (results.length == 0) {
                    return res.status(404).json({
                        success: 0,
                        message: "Not found"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Subject Category found",
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
    add_sub_category: (req, res) => {
        const body = req.body
        if (body.title != '' && body.subject_id != '' && body.category_id != '') {
            sub_category_last_id((err, results_id) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (!results_id) {
                    body.sub_category_id = 'sub-category-01'
                } else {
                    body.sub_category_id = 'sub-category-0' + (results_id.id + 1)
                }
                sub_add_category_insert(body, (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Successfully Added"
                    })
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    all_sub_category: (req, res) => {
        if (req.params.category_id != '') {
            all_sub_category_fetch(req.params.category_id, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (results.length == 0) {
                    return res.status(404).json({
                        success: 0,
                        message: "Not found"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Subject sub Category found",
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
    sub_category_delete: (req, res) => {
        const body = req.body
        if (body.sub_category_id != '') {
            delete_sub_category(body.sub_category_id, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Successful"
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    category_delete: (req, res) => {
        const body = req.body
        if (body.category_id != '') {
            delete_category(body.category_id, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Successful"
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    subject_delete: (req, res) => {
        const body = req.body
        if (body.subject_id != '') {
            delete_subject(body.subject_id, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Successful"
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    add_question_option: (req, res) => {
        const body = req.body
        if (body.subject != '' && body.category != '' && body.sub_category != '' && body.question != '' && body.option != '') {
            question_last_id((err, results_id) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (!results_id) {
                    body.question_id = 'question-01'
                } else {
                    body.question_id = 'question-0' + (results_id.id + 1)
                }
                add_question_insert(body, (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        })
                    }
                    for (var i = 0; i < body.option.length; i++) {
                        body.option[i].question_id = body.question_id
                        add_option_insert(body.option[i], (err, result) => {
                            if (err) {
                                return res.status(500).json({
                                    success: 0,
                                    message: "Database connection error"
                                })
                            }
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Added successfully"
                    })
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    all_mcq_question: (req, res) => {
        const body = req.params
        if (body.sub_category != '') {
            all_mcq_question_fetch(body.sub_category, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (results.length == 0) {
                    return res.status(404).json({
                        success: 0,
                        message: "Not found"
                    })
                } else {
                    return res.status(200).json({
                        success: 1,
                        message: "MCQ found",
                        data: results
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
    all_mcq_question_option: (req, res) => {
        const body = req.params
        if (body.question != '') {
            all_mcq_question_option_fetch(body.question, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (results.length == 0) {
                    return res.status(404).json({
                        success: 0,
                        message: "Not found"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "MCQ found",
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
    mcq_question_delete: (req, res) => {
        const body = req.body
        if (body.question != '') {
            delete_mcq_question(body.question, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Successful"
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    mcq_by_question: (req, res) => {
        const body = req.params
        if (body.question != '') {
            mcq_by_question_fetch(body.question, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                mcq_by_question_option_fetch(body.question, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        })
                    }
                    results.option = result
                    return res.status(200).json({
                        success: 1,
                        message: "Successful",
                        data: results
                    })
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    add_question_bank_category: (req, res) => {
        if (req.body.title != '') {
            question_bank_category_last_id((err, results_id) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (!results_id) {
                    req.body.question_bank_id = 'ques-bank-cate-01'
                } else {
                    req.body.question_bank_id = 'ques-bank-cate-0' + (results_id.id + 1)
                }
                add_question_bank_category_insert(req.body, (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Successfully Added"
                    })
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    all_question_bank_category: (req, res) => {
        all_question_bank_category_fetch((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            if (results.length == 0) {
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
    add_question_bank_sub_category: (req, res) => {
        if (req.body.title != '' && req.body.question_bank_id != '') {
            question_bank_sub_category_last_id((err, results_id) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (!results_id) {
                    req.body.question_bank_sub_id = 'ques-bank-sub-01'
                } else {
                    req.body.question_bank_sub_id = 'ques-bank-sub-0' + (results_id.id + 1)
                }
                add_question_bank_sub_category_insert(req.body, (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Successfully Added"
                    })
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    all_question_bank_sub_category: (req, res) => {
        if (req.params.action_id != '') {
            all_question_bank_sub_category_fetch(req.params.action_id, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (results.length == 0) {
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
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    question_bank_sub_category_delete: (req, res) => {
        const body = req.body
        if (body.sub_category_id != '') {
            delete_question_bank_sub_category(body.sub_category_id, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Successful"
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    question_bank_category_delete: (req, res) => {
        const body = req.body
        if (body.category_id != '') {
            delete_question_bank_category(body.category_id, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Successful"
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    question_bank_by_name: (req, res) => {
        const body = req.params
        if (body.action_id != '') {
            question_bank_by_name_fetch(body.action_id, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Successful",
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
    add_question_bank_mcq: (req, res) => {
        const body = req.body
        if (body.question_bank != '' && body.question_bank_sub != '' && body.question_title != '' && body.option != '') {
            question_bank_mcq_last_id((err, results_id) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (!results_id) {
                    body.question_bank_mcq = 'question-bank-mcq-01'
                } else {
                    body.question_bank_mcq = 'question-bank-mcq-0' + (results_id.id + 1)
                }
                question_bank_mcq_insert(body, (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Added Successfully"
                    })
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    question_bank_mcq: (req, res) => {
        const body = req.params
        if (body.action_id != '') {
            question_bank_mcq_fetch(body.action_id, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Successful",
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
    delete_question_bank_mcq: (req, res) => {
        const body = req.body
        if (body.action_id != '') {
            question_bank_mcq_delete(body.action_id, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Successful",
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
    question_bank_mcq_by_question: (req, res) => {
        const body = req.params
        if (body.question != '') {
            question_bank_mcq_by_question_fetch(body.question, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Successful",
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
    subjective_question_by_name: (req, res) => {
        const body = req.params
        if (body.action_id != '') {
            subjective_question_by_name_fetch(body.action_id, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Successful",
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
    add_preparation_category: (req, res) => {
        if (req.body.title != '' && req.body.start_date != '' && req.body.end_date != '') {
            preparation_category_last_id((err, results_id) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (!results_id) {
                    req.body.preparation_exam_id = 'preparation-exam-01'
                } else {
                    req.body.preparation_exam_id = 'preparation-exam-0' + (results_id.id + 1)
                }
                req.body.start_date = formatDate(req.body.start_date)
                req.body.end_date = formatDate(req.body.end_date)
                add_preparation_category_insert(req.body, (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Successfully Added"
                    })
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    all_preparation_category: (req, res) => {
        all_preparation_category_fetch((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            if (results.length == 0) {
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
    add_preparation_sub_category: (req, res) => {
        if (req.body.preparation_exam_id != '' && req.body.title != '' && req.body.cut_mark != '' && req.body.start_date != '' && req.body.exam_time != '') {
            preparation_sub_category_last_id((err, results_id) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (!results_id) {
                    req.body.preparation_exam_sub_id = 'preparation-exam-sub-01'
                } else {
                    req.body.preparation_exam_sub_id = 'preparation-exam-sub-0' + (results_id.id + 1)
                }
                req.body.start_date = formatDate(req.body.start_date)
                add_preparation_sub_category_insert(req.body, (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Successfully Added"
                    })
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    all_preparation_sub_category: (req, res) => {
        if (req.params.action_id != '') {
            all_preparation_sub_category_fetch(req.params.action_id, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (results.length == 0) {
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
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    preparation_sub_category_delete: (req, res) => {
        const body = req.body
        if (body.sub_category_id != '') {
            delete_preparation_sub_category(body.sub_category_id, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Successful"
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    preparation_category_delete: (req, res) => {
        const body = req.body
        if (body.category_id != '') {
            delete_preparation_category(body.category_id, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Successful"
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    preparation_exam_by_name: (req, res) => {
        const body = req.params
        if (body.action_id != '') {
            preparation_exam_by_name_fetch(body.action_id, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Successful",
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
    preparation_eaxm_mcq: (req, res) => {
        const body = req.params
        if (body.action_id != '') {
            preparation_eaxm_mcq_fetch(body.action_id, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Successful",
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
    add_preparation_exam_mcq: (req, res) => {
        const body = req.body
        if (body.preparation_exam != '' && body.preparation_exam_sub != '' && body.question_title != '' && body.option != '') {
            preparation_eaxm_mcq_last_id((err, results_id) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (!results_id) {
                    body.preparation_exam_mcq = 'preparation-exam-mcq-01'
                } else {
                    body.preparation_exam_mcq = 'preparation-exam-mcq-0' + (results_id.id + 1)
                }
                preparation_eaxm_mcq_insert(body, (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Added Successfully"
                    })
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    delete_preparation_eaxm_mcq: (req, res) => {
        const body = req.body
        if (body.action_id != '') {
            preparation_eaxm_mcq_delete(body.action_id, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Successful",
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
    preparation_eaxm_mcq_by_question: (req, res) => {
        const body = req.params
        if (body.question != '') {
            preparation_eaxm_mcq_by_question_fetch(body.question, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Successful",
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
    all_user: (req, res) => {
        all_user_fetch((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            if (results.length == 0) {
                return res.status(404).json({
                    success: 0,
                    message: "Empty user"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "User found",
                data: results
            })
        })
    },
    user_active_inactive: (req, res) => {
        const body = req.body
        if (body.status != '' && body.userId != '') {
            user_active_inactive_by(body, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.json({
                    success: 1,
                    message: "Successfull"
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    user_delete: (req, res) => {
        const body = req.body
        if (body.userId != '') {
            user_delete_by(body, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.json({
                    success: 1,
                    message: "Deleted successfully"
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    all_user_deleted: (req, res) => {
        all_user_deleted_fetch((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            if (results.length == 0) {
                return res.status(404).json({
                    success: 0,
                    message: "Empty user"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "User found",
                data: results
            })
        })
    },
    user_delete_forever: (req, res) => {
        const body = req.body
        if (body.userId != '') {
            user_delete_forever_by(body, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.json({
                    success: 1,
                    message: "Deleted Forever"
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    user_restore: (req, res) => {
        const body = req.body
        if (body.userId != '') {
            user_restore_by(body, (err, results) => {
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
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    notice_board: (req, res) => {
        notice_board_fetch((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "notice found",
                data: results
            })
        })
    },
    add_notice_board: (req, res) => {
        add_notice_board_insert(req.body.notice, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Successfull"
            })
        })
    },
    package_info_update: (req, res) => {
        const body = req.body
        if (body.package_id != '' && body.package_type != '' && body.package_price != '' && body.package_description != '' && body.package_status != '') {
            update_package_info(body, (err, results) => {
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
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    package_subscriber_by_name: (req, res) => {
        const body = req.params
        if (body.action_id != '') {
            package_subscriber_by_name_fetch(body.action_id, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Successful",
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
    package_subscriber: (req, res) => {
        const body = req.params
        if (body.action_id != '') {
            package_subscriber_fetch(body.action_id, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (results.length == 0) {
                    return res.status(404).json({
                        success: 0,
                        message: "No Subscriber"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Successful",
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
    package_subscriber_active_inactive: (req, res) => {
        const body = req.body
        if (body.status != '' && body.action_id != '') {
            package_subscriber_active_inactive_by(body, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.json({
                    success: 1,
                    message: "Successfull"
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    add_package_payment: (req, res) => {
        const body = req.body
        if (body.title != '' && body.type != '' && body.account != '' && body.status != '') {
            package_payment_last_id((err, results_id) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (!results_id) {
                    body.action_id = 'payment-method-01'
                } else {
                    body.action_id = 'payment-method-0' + (results_id.id + 1)
                }
                add_package_payment_insert(body, (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        })
                    }
                    return res.json({
                        success: 1,
                        message: "Successfull"
                    })
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    all_package_payment: (req, res) => {
        all_package_payment_fetch((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.json({
                success: 1,
                message: "Successfull",
                data: results
            })
        })
    },
    package_payment_active_inactive: (req, res) => {
        const body = req.body
        if (body.status != '' && body.action_id != '') {
            package_payment_active_inactive_by(body, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.json({
                    success: 1,
                    message: "Successfull"
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    package_payment_delete: (req, res) => {
        const body = req.body
        if (body.action_id != '') {
            delete_package_payment(body, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.json({
                    success: 1,
                    message: "Deleted"
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    create_new_package: (req, res) => {
        const body = req.body
        if (body.title != '' && body.description != '' && body.type != '' && body.price != '' && body.status != '' && body.duration != '') {
            package_last_id((err, results_id) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (!results_id) {
                    body.package_id = 'package-01'
                } else {
                    body.package_id = 'package-0' + (results_id.id + 1)
                }
                create_new_package(body, (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        })
                    }
                    return res.json({
                        success: 1,
                        message: "Successfull"
                    })
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    package_all_list: (req, res) => {
        package_all_list((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            if (results.length == 0) {
                return res.status(404).json({
                    success: 0,
                    message: "Package not found"
                })
            }
            return res.json({
                success: 1,
                message: "Package found",
                data: results
            })
        })
    },
    old_package_update: (req, res) => {
        const body = req.body
        if (body.package_id != '' && body.title != '' && body.description != '' && body.type != '' && body.price != '' && body.status != '' && body.duration != '') {
            old_package_update(body, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.json({
                    success: 1,
                    message: "Successfull"
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