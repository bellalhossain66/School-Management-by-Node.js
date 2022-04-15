const pool = require('../../../lib/database')

module.exports = {
    adminSignIn: (email, callBack) => {
        pool.query(
            "select * from admin where email=?", [email],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    studentData: callBack => {
        pool.query(
            "select * from student",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    teacherData: callBack => {
        pool.query(
            "select * from teacher",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    studentBan: (body, callBack) => {
        pool.query(
            "update student set action=? where id=?", [
                body.action,
                body.id
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    studentPermit: (body, callBack) => {
        pool.query(
            "update student set action=? where id=?", [
                body.action,
                body.id
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    teacherBan: (body, callBack) => {
        pool.query(
            "update teacher set action=? where id=?", [
                body.action,
                body.id
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    teacherPermit: (body, callBack) => {
        pool.query(
            "update teacher set action=? where id=?", [
                body.action,
                body.id
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    removeStudent: (id, callBack) => {
        pool.query(
            "delete from student where id=?", [id],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    removeTeacher: (id, callBack) => {
        pool.query(
            "delete from teacher where id=?", [id],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    }
}