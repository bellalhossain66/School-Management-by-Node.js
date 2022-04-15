const { verify } = require('jsonwebtoken')

module.exports = app => {
    app.get('/profile', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            verify(jwtoken, process.env.STU_JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('logCheck')
                    res.redirect('/')
                }
                res.render('student/profile', {
                    title: 'Student/Profile',
                    first_name: decoded.first_name,
                    last_name: decoded.last_name,
                    userId: decoded.userId
                })
            })
        } else {
            res.redirect('/')
        }
    })
    app.get('/profile-update', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            verify(jwtoken, process.env.STU_JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('logCheck')
                    res.redirect('/')
                }
                res.render('student/profile-update', {
                    title: 'Student/Profile Update',
                    first_name: decoded.first_name,
                    last_name: decoded.last_name,
                    userId: decoded.userId
                })
            })
        } else {
            res.redirect('/')
        }
    })
    app.get('/password-update', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            verify(jwtoken, process.env.STU_JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('logCheck')
                    res.redirect('/')
                }
                res.render('student/password-update', {
                    title: 'Student/Password Update',
                    first_name: decoded.first_name,
                    last_name: decoded.last_name,
                    userId: decoded.userId
                })
            })
        } else {
            res.redirect('/')
        }
    })
    app.get('/course-enroll', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            verify(jwtoken, process.env.STU_JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('logCheck')
                    res.redirect('/')
                }
                res.render('student/course-enroll', {
                    title: 'Student/Course Enroll',
                    first_name: decoded.first_name,
                    last_name: decoded.last_name,
                    userId: decoded.userId
                })
            })
        } else {
            res.redirect('/')
        }
    })
    app.get('/mcq-question', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            verify(jwtoken, process.env.STU_JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('logCheck')
                    res.redirect('/')
                }
                res.render('student/mcq-question', {
                    title: 'Student/MCQ Question',
                    first_name: decoded.first_name,
                    last_name: decoded.last_name,
                    userId: decoded.userId
                })
            })
        } else {
            res.redirect('/')
        }
    })
}