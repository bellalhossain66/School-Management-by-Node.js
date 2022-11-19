const pool = require('../../system/database/database')

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
    }
}