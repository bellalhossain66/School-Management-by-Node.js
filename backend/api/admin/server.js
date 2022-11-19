const pool = require('../../system/database/database')

module.exports = {
    subject_last_id: (callBack) => {
        pool.query(
            "select id from `sub_jective` order by id desc limit 1",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    add_subject_insert: (body, callBack) => {
        pool.query(
            "insert into `sub_jective`(`sub_jective_id`,`title`) values(?,?)", [
                body.subject_id,
                body.title
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    all_subject_fetch: (callBack) => {
        pool.query(
            "select * from `sub_jective` order by id asc",
            (error, results, fields) => {
                if (error) return callBack(error)
                if (results.length == 0) return callBack(null, results)
                for (let i = 0; i < results.length; i++) {
                    pool.query(
                        "select count(id) as total " +
                        "from `question` " +
                        "where `subject_id`=? and `category_id`='0' and `sub_category_id`='0'", [results[i].sub_jective_id],
                        (error, results_mcq, fields) => {
                            if (error) return callBack(error)
                            if (results_mcq[0].total > 0) {
                                results[i].status = 'mcq'
                            } else {
                                results[i].status = 'option'
                            }
                            results[i].total_mcq = results_mcq[0].total
                            if (i == results.length - 1) {
                                return callBack(null, results)
                            }
                        }
                    )
                }
            }
        )
    },
    category_last_id: (callBack) => {
        pool.query(
            "select id from `subject_category` order by id desc limit 1",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    add_category_insert: (body, callBack) => {
        pool.query(
            "insert into `subject_category`(`sub_category_id`,`subject_id`,`title`) values(?,?,?)", [
                body.category_id,
                body.subject_id,
                body.title
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    all_category_fetch: (subject_id, callBack) => {
        pool.query(
            "select * from `subject_category` where `subject_id`=? order by id asc", [subject_id],
            (error, results, fields) => {
                if (error) return callBack(error)
                if (results.length == 0) return callBack(null, results)
                for (let i = 0; i < results.length; i++) {
                    pool.query(
                        "select count(id) as total " +
                        "from `question` " +
                        "where  `category_id`=? and `sub_category_id`='0'", [results[i].sub_category_id],
                        (error, results_mcq, fields) => {
                            if (error) return callBack(error)
                            if (results_mcq[0].total > 0) {
                                results[i].status = 'mcq'
                            } else {
                                results[i].status = 'option'
                            }
                            results[i].total_mcq = results_mcq[0].total
                            if (i == results.length - 1) {
                                return callBack(null, results)
                            }
                        }
                    )
                }
            }
        )
    },
    sub_category_last_id: (callBack) => {
        pool.query(
            "select id from `subject_sub_category` order by id desc limit 1",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    sub_add_category_insert: (body, callBack) => {
        pool.query(
            "insert into `subject_sub_category`(`sub_sub_cate_id`,`sub_category_id`,`subject_id`,`title`) values(?,?,?,?)", [
                body.sub_category_id,
                body.category_id,
                body.subject_id,
                body.title
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    all_sub_category_fetch: (category_id, callBack) => {
        pool.query(
            "select * from `subject_sub_category` where `sub_category_id`=? order by id asc", [category_id],
            (error, results, fields) => {
                if (error) return callBack(error)
                if (results.length == 0) return callBack(null, results)
                for (let i = 0; i < results.length; i++) {
                    pool.query(
                        "select count(id) as total " +
                        "from `question` " +
                        "where sub_category_id=?", [results[i].sub_sub_cate_id],
                        (error, results_mcq, fields) => {
                            if (error) return callBack(error)
                            results[i].total_mcq = results_mcq[0].total
                            if (i == results.length - 1) {
                                return callBack(null, results)
                            }
                        }
                    )
                }
            }
        )
    },
    delete_sub_category: (sub_category_id, callBack) => {
        pool.query(
            "delete from `subject_sub_category` where `sub_sub_cate_id`=?", [sub_category_id],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    delete_category: (category_id, callBack) => {
        pool.query(
            "delete from `subject_category` where `sub_category_id`=?", [category_id],
            (error, results, fields) => {
                if (error) return callBack(error)
                pool.query(
                    "delete from `subject_sub_category` where `sub_category_id`=?", [category_id],
                    (error, results, fields) => {
                        if (error) return callBack(error)
                        return callBack(null, results)
                    }
                )
            }
        )
    },
    delete_subject: (subject_id, callBack) => {
        pool.query(
            "delete from `sub_jective` where `sub_jective_id`=?", [subject_id],
            (error, results, fields) => {
                if (error) return callBack(error)
                pool.query(
                    "delete from `subject_category` where `subject_id`=?", [subject_id],
                    (error, results, fields) => {
                        if (error) return callBack(error)
                        pool.query(
                            "delete from `subject_sub_category` where `subject_id`=?", [subject_id],
                            (error, results, fields) => {
                                if (error) return callBack(error)
                                return callBack(null, results)
                            }
                        )
                    }
                )
            }
        )
    },
    question_last_id: (callBack) => {
        pool.query(
            "select id from `question` order by id desc limit 1",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    add_question_insert: (body, callBack) => {
        pool.query(
            "insert into `question`(`question_id`,`subject_id`,`category_id`,`sub_category_id`,`question_title`,`description`) " +
            "values(?,?,?,?,?,?)", [
                body.question_id,
                body.subject,
                body.category,
                body.sub_category,
                body.question,
                body.description
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    add_option_insert: (body, callBack) => {
        pool.query(
            "insert into `que_option`(`question_id`,`option_title`,`correct`) " +
            "values(?,?,?)", [
                body.question_id,
                body.option_title,
                body.option_status
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    all_mcq_question_fetch: (sub_category, callBack) => {
        pool.query(
            "select * from `question` where (`subject_id`=? and `category_id`=0 and `sub_category_id`=0) " +
            "or (`category_id`=? and `sub_category_id`=0) " +
            "or `sub_category_id`=? order by id desc", [
                sub_category,
                sub_category,
                sub_category
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    all_mcq_question_option_fetch: (question, callBack) => {
        pool.query(
            "select * from `que_option` where `question_id`=? order by id asc", [question],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    delete_mcq_question: (question, callBack) => {
        pool.query(
            "delete from `question` where `question_id`=?", [question],
            (error, results, fields) => {
                if (error) return callBack(error)
                pool.query(
                    "delete from `que_option` where `question_id`=?", [question],
                    (error, results, fields) => {
                        if (error) return callBack(error)
                        return callBack(null, results)
                    }
                )
            }
        )
    },
    mcq_by_question_fetch: (question, callBack) => {
        pool.query(
            "select * from `question` where `question_id`=?", [question],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    mcq_by_question_option_fetch: (question, callBack) => {
        pool.query(
            "select * from `que_option` where `question_id`=?", [question],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    question_bank_category_last_id: (callBack) => {
        pool.query(
            "select id from `question_bank` order by id desc limit 1",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    add_question_bank_category_insert: (body, callBack) => {
        pool.query(
            "insert into `question_bank`(`question_bank_id`,`title`) values(?,?)", [
                body.question_bank_id,
                body.title
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    all_question_bank_category_fetch: (callBack) => {
        pool.query(
            "select * from `question_bank` order by id asc",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    question_bank_sub_category_last_id: (callBack) => {
        pool.query(
            "select id from `question_bank_sub` order by id desc limit 1",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    add_question_bank_sub_category_insert: (body, callBack) => {
        pool.query(
            "insert into `question_bank_sub`(`question_bank_sub_id`,`question_bank_id`,`title`) values(?,?,?)", [
                body.question_bank_sub_id,
                body.question_bank_id,
                body.title
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    all_question_bank_sub_category_fetch: (question_bank_id, callBack) => {
        pool.query(
            "select * from `question_bank_sub` where `question_bank_id`=? order by id asc", [question_bank_id],
            (error, results, fields) => {
                if (error) return callBack(error)
                if (results.length == 0) {
                    return callBack(null, results)
                }
                for (let i = 0; i < results.length; i++) {
                    pool.query(
                        "select count(id) as total " +
                        "from `question_bank_mcq` " +
                        "where question_bank_sub_id=?", [results[i].question_bank_sub_id],
                        (error, results_mcq, fields) => {
                            if (error) return callBack(error)
                            results[i].total_mcq = results_mcq[0].total
                            if (i == results.length - 1) {
                                return callBack(null, results)
                            }
                        }
                    )
                }
            }
        )
    },
    delete_question_bank_sub_category: (sub_category_id, callBack) => {
        pool.query(
            "delete from `question_bank_sub` where `question_bank_sub_id`=?", [sub_category_id],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    delete_question_bank_category: (category_id, callBack) => {
        pool.query(
            "delete from `question_bank` where `question_bank_id`=?", [category_id],
            (error, results, fields) => {
                if (error) return callBack(error)
                pool.query(
                    "delete from `question_bank_sub` where `question_bank_id`=?", [category_id],
                    (error, results, fields) => {
                        if (error) return callBack(error)
                        return callBack(null, results)
                    }
                )
            }
        )
    },
    question_bank_by_name_fetch: (sub_category_id, callBack) => {
        pool.query(
            "select question_bank_sub.title as name2, question_bank.title as name1, question_bank.question_bank_id as id1 " +
            "from `question_bank_sub` " +
            "join `question_bank` on question_bank_sub.question_bank_id=question_bank.question_bank_id " +
            "where question_bank_sub.question_bank_sub_id=?", [sub_category_id],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    question_bank_mcq_last_id: (callBack) => {
        pool.query(
            "select id from `question_bank_mcq` order by id desc limit 1",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    question_bank_mcq_insert: (body, callBack) => {
        pool.query(
            "insert into `question_bank_mcq`(`question_bank_mcq_id`,`question_bank_id`,`question_bank_sub_id`,`question_title`,`description`) " +
            "values(?,?,?,?,?)", [
                body.question_bank_mcq,
                body.question_bank,
                body.question_bank_sub,
                body.question_title,
                body.description
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                    //return callBack(null, results)
                for (let i = 0; i < body.option.length; i++) {
                    pool.query(
                        "insert into `question_bank_mcq_option`(`question_id`,`option_title`,`correct`) " +
                        "values(?,?,?)", [
                            body.question_bank_mcq,
                            body.option[i].option_title,
                            body.option[i].option_status
                        ],
                        (error, results, fields) => {
                            if (error) return callBack(error)
                        }
                    )
                }
                return callBack(null, results)
            }
        )
    },
    question_bank_mcq_fetch: (question_bank_sub, callBack) => {
        pool.query(
            "select * " +
            "from `question_bank_mcq` " +
            "where question_bank_sub_id=? order by id desc", [question_bank_sub],
            (error, results, fields) => {
                if (error) return callBack(error)
                if (results.length == 0) return callBack(null, results)
                for (let i = 0; i < results.length; i++) {
                    pool.query(
                        "select `option_title`, `correct` " +
                        "from `question_bank_mcq_option` where `question_id`=?", [results[i].question_bank_mcq_id],
                        (error, result_option, fields) => {
                            if (error) return callBack(error)
                            results[i].options = result_option
                            if (i === results.length - 1) {
                                return callBack(null, results)
                            }
                        }
                    )
                }
            }
        )
    },
    question_bank_mcq_delete: (question_bank_mcq_id, callBack) => {
        pool.query(
            "delete from `question_bank_mcq` where `question_bank_mcq_id`=?", [question_bank_mcq_id],
            (error, results, fields) => {
                if (error) return callBack(error)
                    //return callBack(null, results)
                pool.query(
                    "delete from `question_bank_mcq_option` where `question_id`=?", [question_bank_mcq_id],
                    (error, results, fields) => {
                        if (error) return callBack(error)
                        return callBack(null, results)
                    }
                )
            }
        )
    },
    question_bank_mcq_by_question_fetch: (question, callBack) => {
        pool.query(
            "select * from `question_bank_mcq` where `question_bank_mcq_id`=?", [question],
            (error, results, fields) => {
                if (error) return callBack(error)
                    //return callBack(null, results[0])
                pool.query(
                    "select `option_title`, `correct` " +
                    "from `question_bank_mcq_option` where `question_id`=?", [question],
                    (error, result_option, fields) => {
                        if (error) return callBack(error)
                        results[0].option = result_option
                        return callBack(null, results[0])
                    }
                )
            }
        )
    },
    subjective_question_by_name_fetch: (sub_category_id, callBack) => {
        if (sub_category_id.includes('sub-category')) {
            pool.query(
                "select sub_jective.title as name1, subject_category.title as name2, subject_sub_category.title as name3 " +
                "from `subject_sub_category` " +
                "join `sub_jective` on subject_sub_category.subject_id=sub_jective.sub_jective_id " +
                "join `subject_category` on subject_sub_category.sub_category_id=subject_category.sub_category_id " +
                "where subject_sub_category.sub_sub_cate_id=?", [sub_category_id],
                (error, results, fields) => {
                    if (error) return callBack(error)
                    return callBack(null, results[0])
                }
            )
        } else if (sub_category_id.includes('category')) {
            pool.query(
                "select sub_jective.title as name1, subject_category.title as name2 " +
                "from `subject_category` " +
                "join `sub_jective` on subject_category.subject_id=sub_jective.sub_jective_id " +
                "where subject_category.sub_category_id=?", [sub_category_id],
                (error, results, fields) => {
                    if (error) return callBack(error)
                    return callBack(null, results[0])
                }
            )
        } else if (sub_category_id.includes('subject')) {
            pool.query(
                "select title as name1 " +
                "from `sub_jective` " +
                "where sub_jective_id=?", [sub_category_id],
                (error, results, fields) => {
                    if (error) return callBack(error)
                    return callBack(null, results[0])
                }
            )
        } else {
            return callBack(null, '')
        }
    },
    preparation_category_last_id: (callBack) => {
        pool.query(
            "select id from `preparation_exam` order by id desc limit 1",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    add_preparation_category_insert: (body, callBack) => {
        pool.query(
            "insert into `preparation_exam`(`preparation_exam_id`,`title`,`start_date`,`end_date`) values(?,?,?,?)", [
                body.preparation_exam_id,
                body.title,
                body.start_date,
                body.end_date
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    all_preparation_category_fetch: (callBack) => {
        pool.query(
            "select * from `preparation_exam` order by id asc",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    preparation_sub_category_last_id: (callBack) => {
        pool.query(
            "select id from `preparation_exam_sub` order by id desc limit 1",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    add_preparation_sub_category_insert: (body, callBack) => {
        pool.query(
            "insert into `preparation_exam_sub`(`preparation_exam_sub_id`,`preparation_exam_id`,`title`,`cut_mark`,`start_date`,`exam_time`) values(?,?,?,?,?,?)", [
                body.preparation_exam_sub_id,
                body.preparation_exam_id,
                body.title,
                body.cut_mark,
                body.start_date,
                body.exam_time
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    all_preparation_sub_category_fetch: (preparation_exam_id, callBack) => {
        pool.query(
            "select * from `preparation_exam_sub` where `preparation_exam_id`=? order by id desc", [preparation_exam_id],
            (error, results, fields) => {
                if (error) return callBack(error)
                if (results.length == 0) {
                    return callBack(null, results)
                }
                for (let i = 0; i < results.length; i++) {
                    pool.query(
                        "select count(id) as total " +
                        "from `preparation_exam_mcq` " +
                        "where preparation_exam_sub_id=?", [results[i].preparation_exam_sub_id],
                        (error, results_mcq, fields) => {
                            if (error) return callBack(error)
                            results[i].total_mcq = results_mcq[0].total
                            if (i == results.length - 1) {
                                return callBack(null, results)
                            }
                        }
                    )
                }
            }
        )
    },
    delete_preparation_sub_category: (sub_category_id, callBack) => {
        pool.query(
            "delete from `preparation_exam_sub` where `preparation_exam_sub_id`=?", [sub_category_id],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    delete_preparation_category: (category_id, callBack) => {
        pool.query(
            "delete from `preparation_exam` where `preparation_exam_id`=?", [category_id],
            (error, results, fields) => {
                if (error) return callBack(error)
                pool.query(
                    "delete from `preparation_exam_sub` where `preparation_exam_id`=?", [category_id],
                    (error, results, fields) => {
                        if (error) return callBack(error)
                        return callBack(null, results)
                    }
                )
            }
        )
    },
    preparation_exam_by_name_fetch: (sub_category_id, callBack) => {
        pool.query(
            "select preparation_exam.title as name1, preparation_exam_sub.title as name2, preparation_exam.preparation_exam_id as id1 " +
            "from `preparation_exam_sub` " +
            "join `preparation_exam` on preparation_exam_sub.preparation_exam_id=preparation_exam.preparation_exam_id " +
            "where preparation_exam_sub.preparation_exam_sub_id=?", [sub_category_id],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    preparation_eaxm_mcq_fetch: (preparation_exam_sub, callBack) => {
        pool.query(
            "select * " +
            "from `preparation_exam_mcq` " +
            "where preparation_exam_sub_id=?", [preparation_exam_sub],
            (error, results, fields) => {
                if (error) return callBack(error)
                if (results.length == 0) return callBack(null, results)
                for (let i = 0; i < results.length; i++) {
                    pool.query(
                        "select `option_title`, `correct` " +
                        "from `preparation_exam_mcq_option` where `question_id`=?", [results[i].preparation_exam_mcq_id],
                        (error, result_option, fields) => {
                            if (error) return callBack(error)
                            results[i].options = result_option
                            if (i === results.length - 1) {
                                return callBack(null, results)
                            }
                        }
                    )
                }
            }
        )
    },
    preparation_eaxm_mcq_last_id: (callBack) => {
        pool.query(
            "select id from `preparation_exam_mcq` order by id desc limit 1",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    preparation_eaxm_mcq_insert: (body, callBack) => {
        pool.query(
            "insert into `preparation_exam_mcq`(`preparation_exam_mcq_id`,`preparation_exam_id`,`preparation_exam_sub_id`,`question_title`,`description`) " +
            "values(?,?,?,?,?)", [
                body.preparation_exam_mcq,
                body.preparation_exam,
                body.preparation_exam_sub,
                body.question_title,
                body.description
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                    //return callBack(null, results)
                for (let i = 0; i < body.option.length; i++) {
                    pool.query(
                        "insert into `preparation_exam_mcq_option`(`question_id`,`option_title`,`correct`) " +
                        "values(?,?,?)", [
                            body.preparation_exam_mcq,
                            body.option[i].option_title,
                            body.option[i].option_status
                        ],
                        (error, results, fields) => {
                            if (error) return callBack(error)
                        }
                    )
                }
                return callBack(null, results)
            }
        )
    },
    preparation_eaxm_mcq_delete: (preparation_exam_mcq_id, callBack) => {
        pool.query(
            "delete from `preparation_exam_mcq` where `preparation_exam_mcq_id`=?", [preparation_exam_mcq_id],
            (error, results, fields) => {
                if (error) return callBack(error)
                    //return callBack(null, results)
                pool.query(
                    "delete from `preparation_exam_mcq_option` where `question_id`=?", [preparation_exam_mcq_id],
                    (error, results, fields) => {
                        if (error) return callBack(error)
                        return callBack(null, results)
                    }
                )
            }
        )
    },
    preparation_eaxm_mcq_by_question_fetch: (question, callBack) => {
        pool.query(
            "select * from `preparation_exam_mcq` where `preparation_exam_mcq_id`=?", [question],
            (error, results, fields) => {
                if (error) return callBack(error)
                    //return callBack(null, results[0])
                pool.query(
                    "select `option_title`, `correct` " +
                    "from `preparation_exam_mcq_option` where `question_id`=?", [question],
                    (error, result_option, fields) => {
                        if (error) return callBack(error)
                        results[0].option = result_option
                        return callBack(null, results[0])
                    }
                )
            }
        )
    },
    all_user_fetch: (callBack) => {
        pool.query(
            "select full_name as name, `userId`, `email`, `phone`, `active` from `student` where `action`=0 order by id desc",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    user_active_inactive_by: (body, callBack) => {
        pool.query(
            "update `student` set `active`=? where `userId`=?", [
                body.status,
                body.userId
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    user_delete_by: (body, callBack) => {
        pool.query(
            "update `student` set `action`='5' where `userId`=?", [
                body.userId
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    all_user_deleted_fetch: (callBack) => {
        pool.query(
            "select full_name as name, `userId`, `email`, `phone`, `active` from `student` where `action`='5' order by id desc",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    user_delete_forever_by: (body, callBack) => {
        pool.query(
            "delete from `student` where `userId`=?", [
                body.userId
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    user_restore_by: (body, callBack) => {
        pool.query(
            "update `student` set `action`='0' where `userId`=?", [
                body.userId
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    notice_board_fetch: (callBack) => {
        pool.query(
            "select `notice` from `notice` limit 1",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    add_notice_board_insert: (body, callBack) => {
        pool.query(
            "update `notice` set `notice`=? where `id`=1", [
                body
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    update_package_info: (body, callBack) => {
        pool.query(
            "update `preparation_exam` set `status`=?,`amount`=?,`description`=?,`active`=? where `preparation_exam_id`=?", [
                body.package_type,
                body.package_price,
                body.package_description,
                body.package_status,
                body.package_id
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    package_subscriber_by_name_fetch: (category_id, callBack) => {
        pool.query(
            "select packages_all.title as name1 " +
            "from `packages_all` " +
            "where `package_id`=?", [category_id],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    package_subscriber_fetch: (category_id, callBack) => {
        pool.query(
            "select * from `package_subscriber` where `package_id`=?", [category_id],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    package_subscriber_active_inactive_by: (body, callBack) => {
        pool.query(
            "update `package_subscriber` set `active`=? where `pack_subs_id`=?", [
                body.status,
                body.action_id
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    package_payment_last_id: (callBack) => {
        pool.query(
            "select id from `payment_method` order by id desc limit 1",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    add_package_payment_insert: (body, callBack) => {
        pool.query(
            "insert into `payment_method`(`pay_method_id`,`title`,`account_no`,`type`,`active`) " +
            "values(?,?,?,?,?)", [
                body.action_id,
                body.title,
                body.account,
                body.type,
                body.status
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    all_package_payment_fetch: (callBack) => {
        pool.query(
            "select * from `payment_method` order by id desc",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    package_payment_active_inactive_by: (body, callBack) => {
        pool.query(
            "update `payment_method` set `active`=? where `pay_method_id`=?", [
                body.status,
                body.action_id
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    delete_package_payment: (body, callBack) => {
        pool.query(
            "delete from `payment_method` where `pay_method_id`=?", [
                body.action_id
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    package_last_id: (callBack) => {
        pool.query(
            "select id from `packages_all` order by id desc limit 1",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    create_new_package: (body, callBack) => {
        pool.query(
            "insert into `packages_all`(`package_id`,`title`,`description`,`type`,`price`,`status`,`duration`) values(?,?,?,?,?,?,?)", [
                body.package_id,
                body.title,
                body.description,
                body.type,
                body.price,
                body.status,
                body.duration
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    package_all_list: (callBack) => {
        pool.query(
            "select * from `packages_all` order by id desc",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    old_package_update: (body, callBack) => {
        pool.query(
            "update `packages_all` set `title`=?,`description`=?,`type`=?,`price`=?,`status`=?,`duration`=? " +
            "where `package_id`=?", [
                body.title,
                body.description,
                body.type,
                body.price,
                body.status,
                body.duration,
                body.package_id
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    }
}