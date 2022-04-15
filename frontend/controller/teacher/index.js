const { verify } = require('jsonwebtoken')

module.exports = app => {
    app.get('/profilee', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            verify(jwtoken, process.env.TEACHER_JWT_SECRET, (err, decoded) => {
                if (err) {
                    console.log(err)
                    res.clearCookie('log_token')
                    res.clearCookie('logCheck')
                        //res.redirect('/')
                }
                res.render('teacher/profile', {
                    title: 'Teacher/Profile',
                    first_name: decoded.first_name,
                    last_name: decoded.last_name,
                    userId: decoded.userId
                })
            })
        } else {
            res.redirect('/')
        }
    })
    app.get('/profile-updatee', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            verify(jwtoken, process.env.TEACHER_JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('logCheck')
                    res.redirect('/')
                }
                res.render('teacher/profile-update', {
                    title: 'Teacher/Profile Update',
                    first_name: decoded.first_name,
                    last_name: decoded.last_name,
                    userId: decoded.userId
                })
            })
        } else {
            res.redirect('/')
        }
    })
    app.get('/password-updatee', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            verify(jwtoken, process.env.TEACHER_JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('logCheck')
                    res.redirect('/')
                }
                res.render('teacher/password-update', {
                    title: 'Teacher/Password Update',
                    first_name: decoded.first_name,
                    last_name: decoded.last_name,
                    userId: decoded.userId
                })
            })
        } else {
            res.redirect('/')
        }
    })
    app.get('/create-course', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            verify(jwtoken, process.env.TEACHER_JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('logCheck')
                    res.redirect('/')
                }
                res.render('teacher/create-course', {
                    title: 'Teacher/Create Course',
                    first_name: decoded.first_name,
                    last_name: decoded.last_name,
                    userId: decoded.userId
                })
            })
        } else {
            res.redirect('/')
        }
    })
    app.get('/course', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            verify(jwtoken, process.env.TEACHER_JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('logCheck')
                    res.redirect('/')
                }
                res.render('teacher/course', {
                    title: 'Teacher/Course',
                    first_name: decoded.first_name,
                    last_name: decoded.last_name,
                    userId: decoded.userId
                })
            })
        } else {
            res.redirect('/')
        }
    })
    app.get('/create-question', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            verify(jwtoken, process.env.TEACHER_JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('logCheck')
                    res.redirect('/')
                }
                res.render('teacher/create-question', {
                    title: 'Teacher/Create Question',
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
            verify(jwtoken, process.env.TEACHER_JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('logCheck')
                    res.redirect('/')
                }
                res.render('teacher/create-question', {
                    title: 'Teacher/Create Question',
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