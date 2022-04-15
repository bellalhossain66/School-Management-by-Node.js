const pool = require('../../../lib/database')

module.exports = {
    createTeacher: (body, callBack) => {
        pool.query(
            "insert into teacher(first_name,last_name,userId,email,password) values(?,?,?,?,?)", [
                body.first_name,
                body.last_name,
                body.userId,
                body.email,
                body.password
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    teacherSignIn: (email, callBack) => {
        pool.query(
            "select * from teacher where email=?", [email],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    viewProfile: (userId, callBack) => {
        pool.query(
            "select * from teacher where userId=?", [userId],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    updateProfile: (body, callBack) => {
        pool.query(
            "update teacher set first_name=?,last_name=? where userId=?", [
                body.first_name,
                body.last_name,
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
            "select password from teacher where userId=?", [userId],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    updatePass: (body, callBack) => {
        pool.query(
            "update teacher set password=? where id=?", [
                body.password,
                body.id
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    createCourse: (body, callBack) => {
        pool.query(
            "insert into Course(title,class,teacherId) values(?,?,?)", [
                body.title,
                body.class,
                body.teacherId
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    viewCourse: (teacherId, callBack) => {
        pool.query(
            "select * from Course where teacherId=?", [teacherId],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    create_mcq_question: (body, callBack) => {
        pool.query(
            "insert into question(courseId,title,teacherId) values(?,?,?)", [
                body.courseId,
                body.title,
                body.teacherId
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    create_mcq_question_option: (body, callBack) => {
        pool.query(
            "insert into que_option(sub_title,ques_Id,correct) values(?,?,?)", [
                body.sub_title,
                body.ques_Id,
                body.correct
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    mcq_only_question_fetch: (courseId, callBack) => {
        pool.query(
            "select * from question where courseId=?", [courseId],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    mcq_only_question_option_fetch: (questionId, callBack) => {
        pool.query(
            "select * from que_option where ques_Id=?", [questionId],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    mcq_question_fetch: (courseId, callBack) => {
        pool.query(
            "select question.id as questionId,question.courseId,question.title,question.teacherId,question.action," +
            "que_option.id as question_optionId,que_option.sub_title,que_option.ques_Id,que_option.correct,que_option.action" +
            " from question left join que_option on question.id=que_option.ques_Id where courseId=?", [courseId],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    class_name_fetch: callBack => {
        pool.query(
            "select * from class",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    }
}