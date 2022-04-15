const { verify } = require('jsonwebtoken')

module.exports = {
    student_check_token: (req, res, next) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken) {
            verify(jwtoken, process.env.STU_JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.json({
                        success: 0,
                        message: "Please login"
                    })
                }
                next()
            })
        } else {
            return res.json({
                success: 0,
                message: "Access denied"
            })
        }
    },
    teacher_check_token: (req, res, next) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken) {
            verify(jwtoken, process.env.TEACHER_JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.json({
                        success: 0,
                        message: "Please login"
                    })
                }
                next()
            })
        } else {
            return res.json({
                success: 0,
                message: "Access denied"
            })
        }
    },
    admin_check_token: (req, res, next) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken) {
            verify(jwtoken, process.env.ADMIN_JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.json({
                        success: 0,
                        message: "Please login"
                    })
                }
                next()
            })
        } else {
            return res.json({
                success: 0,
                message: "Access denied"
            })
        }
    }
}