const pool = require('../../system/database/database')

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
    check_mail: (body, callBack) => {
        pool.query(
            "select `full_name` from `student` where `email`=?", [
                body.email
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    check_phone: (body, callBack) => {
        pool.query(
            "select `full_name` from `student` where `phone`=?", [
                body.phone
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    createStudent: (body, callBack) => {
        pool.query(
            "insert into `student`(`full_name`,`userId`,`email`,`password`,`phone`) values(?,?,?,?,?)", [
                body.name,
                body.userId,
                body.email,
                body.password,
                body.phone
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    studentSignIn: (email, callBack) => {
        pool.query(
            "select * from `student` where `email`=?", [email],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    viewProfile: (userId, callBack) => {
        pool.query(
            "select full_name as name,`userId`,`email`,`phone` from `student` where `userId`=?", [userId],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    updateProfile: (body, callBack) => {
        pool.query(
            "update `student` set `full_name`=? where `userId`=?", [
                body.name,
                body.userId
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    passwordCheck: (userId, callBack) => {
        pool.query(
            "select `password` from `student` where `userId`=?", [userId],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    updatePass: (body, callBack) => {
        pool.query(
            "update `student` set `password`=? where `userId`=?", [
                body.new_password,
                body.userId
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    question_bank_fetch: (callBack) => {
        pool.query(
            "select `question_bank_id`, `title` from `question_bank` order by id asc",
            (error, results, fields) => {
                if (error) return callBack(error)
                    //return callBack(null, results)
                for (let i = 0; i < results.length; i++) {
                    pool.query(
                        "select count(*) as total " +
                        "from `question_bank_sub` where `question_bank_id`=?", [results[i].question_bank_id],
                        (error, result_option, fields) => {
                            if (error) return callBack(error)
                            results[i].total_option = result_option[0].total
                            if (i === results.length - 1) {
                                return callBack(null, results)
                            }
                        }
                    )
                }
            }
        )
    },
    question_bank_option_fetch: (question_bank_id, callBack) => {
        pool.query(
            "select question_bank_sub_id as question_bank_option_id, `question_bank_id`, `title` " +
            "from `question_bank_sub` where `question_bank_id`=? order by id asc", [question_bank_id],
            (error, results, fields) => {
                if (error) return callBack(error)
                    //return callBack(null, results)
                for (let i = 0; i < results.length; i++) {
                    pool.query(
                        "select count(*) as total " +
                        "from `question_bank_mcq` where `question_bank_sub_id`=?", [results[i].question_bank_option_id],
                        (error, result_option, fields) => {
                            if (error) return callBack(error)
                            results[i].total_question = result_option[0].total
                            if (i === results.length - 1) {
                                return callBack(null, results)
                            }
                        }
                    )
                }
            }
        )
    },
    question_bank_mcq_fetch: (question_bank_sub, callBack) => {
        pool.query(
            "select question_bank_id, question_bank_sub_id as question_bank_option_id, question_bank_mcq_id as question_id, " +
            "question_title, description " +
            "from `question_bank_mcq` " +
            "where question_bank_sub_id=?", [question_bank_sub],
            (error, results, fields) => {
                if (error) return callBack(error)
                if (results.length == 0) return callBack(null, results)
                for (let i = 0; i < results.length; i++) {
                    pool.query(
                        "select `option_title`, `correct` " +
                        "from `question_bank_mcq_option` where `question_id`=?", [results[i].question_id],
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
    subjective_fetch: (callBack) => {
        pool.query(
            "select sub_jective_id as subjective_id, `title` from `sub_jective` order by id asc",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    subjective_category_fetch: (subjective_id, callBack) => {
        pool.query(
            "select sub_category_id as subjective_category_id, `title` " +
            "from `subject_category` where `subject_id`=? order by id asc", [subjective_id],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    subjective_sub_category_fetch: (subjective_category_id, callBack) => {
        pool.query(
            "select sub_sub_cate_id as subjective_sub_category_id, `title` " +
            "from `subject_sub_category` where `sub_category_id`=? order by id asc", [subjective_category_id],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    subjective_mcq_fetch: (subjective_sub_category_id, callBack) => {
        pool.query(
            "select subject_id as subjective_id, category_id as subjective_category_id, sub_category_id as subjective_sub_category_id, " +
            "question_id, question_title, description " +
            "from `question` " +
            "where (`subject_id`=? and `category_id`=0 and `sub_category_id`=0) or (`category_id`=? and `sub_category_id`=0) or `sub_category_id`=?", [
                subjective_sub_category_id,
                subjective_sub_category_id,
                subjective_sub_category_id
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                if (results.length == 0) return callBack(null, results)
                for (let i = 0; i < results.length; i++) {
                    pool.query(
                        "select `option_title`, `correct` " +
                        "from `que_option` where `question_id`=?", [results[i].question_id],
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
    examination_fetch: (callBack) => {
        let today = new Date()
        today = formatDate(today)
        pool.query(
            "select preparation_exam_id as examination_id, `title`, `start_date`, `end_date`, " +
            "case " +
            "when start_date > ? then 'Upcoming' " +
            "when end_date < ? then 'Archive' " +
            "when start_date <= ? and end_date >= ? then 'Running' end as status " +
            "from `preparation_exam` order by id asc", [
                today,
                today,
                today,
                today
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    examination_option_fetch: (body, callBack) => {
        let today = new Date()
        today = formatDate(today)
        pool.query(
            "select preparation_exam_sub_id as examination_option_id, title, start_date as exam_date, concat(exam_time,' ','min') as exam_time, " +
            "case " +
            "when start_date > ? then 'Upcoming' " +
            "when start_date < ? then 'Archive' " +
            "when start_date = ? then 'Running' end as status " +
            "from `preparation_exam_sub`  " +
            "where preparation_exam_id=? and start_date>=? order by id asc", [
                today,
                today,
                today,
                body.examination_id,
                today
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                    //return callBack(null, results)
                if (results.length == 0) return callBack(null, results)
                for (let i = 0; i < results.length; i++) {
                    pool.query(
                        "select count(*) as total " +
                        "from `preparation_exam_mcq` where `preparation_exam_sub_id`=?", [results[i].examination_option_id],
                        (error, result_option, fields) => {
                            if (error) return callBack(error)
                            results[i].total_question = result_option[0].total
                            pool.query(
                                "with answer_sheet as " +
                                "(select a.userId, a.pre_as_title_id as question_id, a.total_mcq, a.total_mcq_marked, a.total_right, a.total_wrong, a.total_marks, " +
                                "case when a.total_marks<b.cut_mark then 'Failed' else 'Passed' end as status," +
                                "DENSE_RANK() over (partition by a.pre_as_title_id order by a.total_marks desc) as my_position, " +
                                "count(*) over (partition by a.pre_as_title_id) as total_applicant, " +
                                "count(case when a.total_marks<b.cut_mark then a.id end) over (partition by a.pre_as_title_id) as total_applicant_passed, " +
                                "max(a.total_marks) over (partition by a.pre_as_title_id) as max_marks, b.cut_mark " +
                                "from `preparation_answer_sheet` as a " +
                                "join `preparation_exam_sub` as b on a.pre_as_title_id=b.preparation_exam_sub_id " +
                                "order by a.id desc) " +
                                "select total_mcq,total_mcq_marked,total_right,total_wrong,total_marks,status,my_position,cut_mark,total_applicant,total_applicant_passed,max_marks " +
                                "from answer_sheet where `userId`=? and question_id=?", [
                                    body.userId,
                                    results[i].examination_option_id
                                ],
                                (error, results_ans, fields) => {
                                    if (error) return callBack(error)
                                    results[i].result = results_ans[0]
                                    if (i === results.length - 1) {
                                        return callBack(null, results)
                                    }
                                }
                            )
                        }
                    )
                }
            }
        )
    },
    examination_option_fetch_running: (body, callBack) => {
        let today = new Date()
        today = formatDate(today)
        pool.query(
            "select preparation_exam_sub_id as examination_option_id, `title`, start_date as exam_date, concat(exam_time,' ','min') as exam_time, " +
            "case " +
            "when start_date > ? then 'Upcoming' " +
            "when start_date < ? then 'Archive' " +
            "when start_date = ? then 'Running' end as status " +
            "from `preparation_exam_sub` where `preparation_exam_id`=? and `start_date`=? order by id asc", [
                today,
                today,
                today,
                body.examination_id,
                today
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                    //return callBack(null, results)
                if (results.length == 0) return callBack(null, results)
                for (let i = 0; i < results.length; i++) {
                    pool.query(
                        "select count(*) as total " +
                        "from `preparation_exam_mcq` where `preparation_exam_sub_id`=?", [results[i].examination_option_id],
                        (error, result_option, fields) => {
                            if (error) return callBack(error)
                            results[i].total_question = result_option[0].total
                            if (i === results.length - 1) {
                                return callBack(null, results)
                            }
                        }
                    )
                }
            }
        )
    },
    examination_option_fetch_upcoming: (body, callBack) => {
        let today = new Date()
        today = formatDate(today)
        pool.query(
            "select preparation_exam_sub_id as examination_option_id, `title`, start_date as exam_date, concat(exam_time,' ','min') as exam_time, " +
            "case " +
            "when start_date > ? then 'Upcoming' " +
            "when start_date < ? then 'Archive' " +
            "when start_date = ? then 'Running' end as status " +
            "from `preparation_exam_sub` where `preparation_exam_id`=? and `start_date`>? order by id asc", [
                today,
                today,
                today,
                body.examination_id,
                today
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                    //return callBack(null, results)
                if (results.length == 0) return callBack(null, results)
                for (let i = 0; i < results.length; i++) {
                    pool.query(
                        "select count(*) as total " +
                        "from `preparation_exam_mcq` where `preparation_exam_sub_id`=?", [results[i].examination_option_id],
                        (error, result_option, fields) => {
                            if (error) return callBack(error)
                            results[i].total_question = result_option[0].total
                            if (i === results.length - 1) {
                                return callBack(null, results)
                            }
                        }
                    )
                }
            }
        )
    },
    examination_option_fetch_archive: (body, callBack) => {
        let today = new Date()
        today = formatDate(today)
        pool.query(
            "select preparation_exam_sub_id as examination_option_id, title, start_date as exam_date, concat(exam_time,' ','min') as exam_time, " +
            "case " +
            "when start_date > ? then 'Upcoming' " +
            "when start_date < ? then 'Archive' " +
            "when start_date = ? then 'Running' end as status " +
            "from `preparation_exam_sub` " +
            "where preparation_exam_id=? and start_date<? order by id asc", [
                today,
                today,
                today,
                body.examination_id,
                today
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                    //return callBack(null, results)
                if (results.length == 0) return callBack(null, results)
                for (let i = 0; i < results.length; i++) {
                    pool.query(
                        "select count(*) as total " +
                        "from `preparation_exam_mcq` where `preparation_exam_sub_id`=?", [results[i].examination_option_id],
                        (error, result_option, fields) => {
                            if (error) return callBack(error)
                            results[i].total_question = result_option[0].total
                            pool.query(
                                "with answer_sheet as " +
                                "(select a.userId, a.pre_as_title_id as question_id, a.total_mcq, a.total_mcq_marked, a.total_right, a.total_wrong, a.total_marks, " +
                                "case when a.total_marks<b.cut_mark then 'Failed' else 'Passed' end as status," +
                                "DENSE_RANK() over (partition by a.pre_as_title_id order by a.total_marks desc) as my_position, " +
                                "count(*) over (partition by a.pre_as_title_id) as total_applicant, " +
                                "count(case when a.total_marks<b.cut_mark then a.id end) over (partition by a.pre_as_title_id) as total_applicant_passed, " +
                                "max(a.total_marks) over (partition by a.pre_as_title_id) as max_marks, b.cut_mark " +
                                "from `preparation_answer_sheet` as a " +
                                "join `preparation_exam_sub` as b on a.pre_as_title_id=b.preparation_exam_sub_id " +
                                "order by a.id desc) " +
                                "select total_mcq,total_mcq_marked,total_right,total_wrong,total_marks,status,my_position,cut_mark,total_applicant,total_applicant_passed,max_marks " +
                                "from answer_sheet where `userId`=? and question_id=?", [
                                    body.userId,
                                    results[i].examination_option_id
                                ],
                                (error, results_ans, fields) => {
                                    if (error) return callBack(error)
                                    results[i].result = results_ans[0]
                                    if (i === results.length - 1) {
                                        return callBack(null, results)
                                    }
                                }
                            )
                        }
                    )
                }
            }
        )
    },
    examination_mcq_fetch: (examination_option_id, callBack) => {
        pool.query(
            "select preparation_exam_id as examination_id, preparation_exam_sub_id as examination_option_id, preparation_exam_mcq_id as question_id, " +
            "question_title, description " +
            "from `preparation_exam_mcq` " +
            "where preparation_exam_sub_id=?", [examination_option_id],
            (error, results, fields) => {
                if (error) return callBack(error)
                    //return callBack(null, results)
                if (results.length == 0) return callBack(null, results)
                for (let i = 0; i < results.length; i++) {
                    pool.query(
                        "select `option_title`, `correct` " +
                        "from `preparation_exam_mcq_option` where `question_id`=?", [results[i].question_id],
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
    personal_practice_answer_last_id: (callBack) => {
        pool.query(
            "select id from `practice_answer_sheet` order by id desc limit 1",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    personal_practice_answer_insert: (body, callBack) => {
        pool.query(
            "insert into `practice_answer_sheet`(`pas_id`,`userId`,`pas_title`,`pas_title_id`,`total_mcq`,`total_mcq_marked`,`total_marks`,`total_right`,`total_wrong`) " +
            "values(?,?,?,?,?,?,?,?,?)", [
                body.pas_id,
                body.userId,
                body.question_title,
                body.question_id,
                body.total_mcq,
                body.total_mcq_marked,
                body.total_marks,
                body.total_right,
                body.total_wrong
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    personal_practice_answer_fetch: (body, callBack) => {
        pool.query(
            "select pas_title_id as question_id, pas_title as question_title, total_mcq, total_mcq_marked, total_right, total_wrong, total_marks" +
            " from `practice_answer_sheet` where `userId`=? order by id desc", [body.userId],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    preparation_practice_answer_last_id: (callBack) => {
        pool.query(
            "select id from `preparation_answer_sheet` order by id desc limit 1",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    preparation_practice_answer_insert: (body, callBack) => {
        let today = new Date()
        today = formatDate(today)
        pool.query(
            "insert into `preparation_answer_sheet`(`pre_as_id`,`userId`,`pre_as_title`,`pre_as_title_id`,`total_mcq`,`total_mcq_marked`,`total_marks`,`total_right`,`total_wrong`,`date`) " +
            "values(?,?,?,?,?,?,?,?,?,?)", [
                body.pas_id,
                body.userId,
                body.question_title,
                body.question_id,
                body.total_mcq,
                body.total_mcq_marked,
                body.total_marks,
                body.total_right,
                body.total_wrong,
                today
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    preparation_practice_answer_fetch: (body, callBack) => {
        pool.query(
            "with answer_sheet as " +
            "(select a.userId, a.pre_as_title_id as question_id, a.pre_as_title as question_title, a.total_mcq, a.total_mcq_marked, a.total_right, a.total_wrong, a.total_marks, " +
            "case when a.total_marks<b.cut_mark then 'Failed' else 'Passed' end as status," +
            "DENSE_RANK() over (partition by a.pre_as_title_id order by a.total_marks desc) as my_position, " +
            "count(*) over (partition by a.pre_as_title_id) as total_applicant, " +
            "count(case when a.total_marks<b.cut_mark then a.id end) over (partition by a.pre_as_title_id) as total_applicant_passed, " +
            "max(a.total_marks) over (partition by a.pre_as_title_id) as max_marks, b.cut_mark " +
            "from `preparation_answer_sheet` as a " +
            "join `preparation_exam_sub` as b on a.pre_as_title_id=b.preparation_exam_sub_id " +
            "order by a.id desc) " +
            "select question_id,question_title,total_mcq,total_mcq_marked,total_right,total_wrong,total_marks,status,my_position,cut_mark,total_applicant,total_applicant_passed,max_marks " +
            "from answer_sheet where `userId`=?", [body.userId],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    preparation_option_answer_sheet_fetch: (body, callBack) => {
        pool.query(
            "with answer_sheet as " +
            "(select a.userId, a.pre_as_title_id as question_id, a.pre_as_title as question_title, a.total_mcq, a.total_mcq_marked, a.total_right, a.total_wrong, a.total_marks, " +
            "case when a.total_marks<b.cut_mark then 'Failed' else 'Passed' end as status," +
            "DENSE_RANK() over (partition by a.pre_as_title_id order by a.total_marks desc) as my_position, " +
            "count(*) over (partition by a.pre_as_title_id) as total_applicant, " +
            "count(case when a.total_marks<b.cut_mark then a.id end) over (partition by a.pre_as_title_id) as total_applicant_passed, " +
            "max(a.total_marks) over (partition by a.pre_as_title_id) as max_marks, b.cut_mark " +
            "from `preparation_answer_sheet` as a " +
            "join `preparation_exam_sub` as b on a.pre_as_title_id=b.preparation_exam_sub_id " +
            "order by a.id desc) " +
            "select question_id,question_title,total_mcq,total_mcq_marked,total_right,total_wrong,total_marks,status,my_position,cut_mark,total_applicant,total_applicant_passed,max_marks " +
            "from answer_sheet where `userId`=? and question_id=?", [
                body.userId,
                body.examination_option_id
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    user_packages_list: (userId, callBack) => {
        pool.query(
            "select a.package_id as package_no, a.title, a.description, a.type, a.price, CONCAT(a.duration, ' days') as duration, " +
            "case when b.userId=? and b.active=0 then 'bought' else 'buy' end as user_status " +
            "from `packages_all` as a " +
            "left join `package_subscriber` as b on a.package_id=b.package_id and userId=? " +
            "where a.status='0' order by a.id asc", [
                userId,
                userId
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    }
}