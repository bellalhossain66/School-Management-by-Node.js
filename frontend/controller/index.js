const { verify } = require('jsonwebtoken')

module.exports = (app) => {
    app.get('/', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            verify(jwtoken, process.env.ADMIN_JWT_SECRET, (err, decoded) => {
                if (err) {
                    verify(jwtoken, process.env.TEACHER_JWT_SECRET, (err, decoded) => {
                        if (err) {
                            verify(jwtoken, process.env.STU_JWT_SECRET, (err, decoded) => {
                                if (err) {
                                    res.clearCookie('log_token')
                                    res.clearCookie('logCheck')
                                    res.redirect('/')
                                }
                                res.redirect('/student')
                            })
                        }
                        res.redirect('/tescher')
                    })
                }
                res.redirect('/admin')
            })
        } else {
            res.redirect('/login')
        }
    })
    app.get('/login', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            res.redirect('/')
        } else {
            res.render('login', {
                title: 'Login'
            })
        }
    })
    app.get('/registration', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            res.redirect('/')
        } else {
            res.render('registration', {
                title: 'Registration'
            })
        }
    })
    app.get('/admin', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            verify(jwtoken, process.env.ADMIN_JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('logCheck')
                    res.redirect('/')
                }
                res.render('admin/index', {
                    title: 'Admin',
                    name: decoded.name
                })
            })
        } else {
            res.redirect('/')
        }
    })
    app.get('/student', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            verify(jwtoken, process.env.STU_JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('logCheck')
                    res.redirect('/')
                }
                res.render('student/index', {
                    title: 'Student',
                    first_name: decoded.first_name,
                    last_name: decoded.last_name
                })
            })
        } else {
            res.redirect('/')
        }
    })
    app.get('/teacher', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            verify(jwtoken, process.env.TEACHER_JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('logCheck')
                    res.redirect('/')
                }
                res.render('teacher/index', {
                    title: 'Teacher',
                    first_name: decoded.first_name,
                    last_name: decoded.last_name
                })
            })
        } else {
            res.redirect('/')
        }
    })
}