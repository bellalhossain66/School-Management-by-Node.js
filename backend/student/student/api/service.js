const pool = require('../../system/database/database')

module.exports = {
    createStudent: (body, callBack) => {
        pool.query(
            "insert into student(first_name,last_name,userId,email,password,class) values(?,?,?,?,?,?)", [
                body.first_name,
                body.last_name,
                body.userId,
                body.email,
                body.password,
                body.class
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    studentSignIn: (email, callBack) => {
        pool.query(
            "select * from student where email=?", [email],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    viewProfile: (userId, callBack) => {
        pool.query(
            "select * from student where userId=?", [userId],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    updateProfile: (body, callBack) => {
        pool.query(
            "update student set first_name=?,last_name=?,class=? where userId=?", [
                body.first_name,
                body.last_name,
                body.class,
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
            "select password from student where userId=?", [userId],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    updatePass: (body, callBack) => {
        pool.query(
            "update student set password=? where id=?", [
                body.password,
                body.id
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    course_fetch_stu: callBack => {
        pool.query(
            "select * from Course",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    course_enrolled_fetch: (studentId, callBack) => {
        pool.query(
            "select * from course_enroll where studentId=?", [studentId],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    course_title_from_id: (courseId, callBack) => {
        pool.query(
            "select * from Course where id=?", [courseId],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    course_enroll_insert: (body, callBack) => {
        pool.query(
            "insert into course_enroll(courseId,studentId) values(?,?)", [
                body.courseId,
                body.studentId
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    }
}