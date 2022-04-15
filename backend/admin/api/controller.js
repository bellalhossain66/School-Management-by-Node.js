const {
    adminSignIn,
    studentData,
    teacherData,
    studentBan,
    teacherBan,
    removeStudent,
    removeTeacher,
    studentPermit,
    teacherPermit
} = require('./service')
const { sign } = require('jsonwebtoken')

module.exports = {
    adminLogIn: (req, res) => {
        const body = req.body
        if (body.email != '' && body.password != '') {
            adminSignIn(body.email, (err, results) => {
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
                        message: "Invalid email or password!"
                    })
                }
                if (body.password == results.password) {
                    const jwtoken = sign({
                            name: results.name,
                            email: results.email
                        },
                        process.env.ADMIN_JWT_SECRET, {
                            expiresIn: '1h'
                        }
                    )
                    res.cookie('log_token', jwtoken)
                    res.cookie('logCheck', true)
                    return res.status(200).json({
                        success: 1,
                        message: "Login Successful"
                    })
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
                message: "Fields are required."
            })
        }
    },
    studentDataFetch: (req, res) => {
        studentData((err, results) => {
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
                    message: "Empty data"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Data found",
                data: results
            })
        })
    },
    teacherDataFetch: (req, res) => {
        teacherData((err, results) => {
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
                    message: "Empty data"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Data found",
                data: results
            })
        })
    },
    studentBanBy: (req, res) => {
        const body = req.body
        body.action = 1
        studentBan(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database copnnection error!",
                    data: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Ban successful"
            })
        })
    },
    studentPermitBy: (req, res) => {
        const body = req.body
        body.action = 0
        studentPermit(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database copnnection error!",
                    data: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Ban successful"
            })
        })
    },
    teacherBanBy: (req, res) => {
        const body = req.body
        body.action = 1
        teacherBan(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database copnnection error!",
                    data: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Ban successful"
            })
        })
    },
    teacherPermitBy: (req, res) => {
        const body = req.body
        body.action = 0
        teacherPermit(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database copnnection error!",
                    data: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Ban successful"
            })
        })
    },
    deleteStudent: (req, res) => {
        const body = req.body
        removeStudent(body.id, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database copnnection error!",
                    data: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Deleted successfully",
                data: results
            })
        })
    },
    deleteTeacher: (req, res) => {
        const body = req.body
        removeTeacher(body.id, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database copnnection error!",
                    data: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Deleted successfully",
                data: results
            })
        })
    }
}