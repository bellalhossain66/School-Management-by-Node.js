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
                    title: 'Profile',
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
                    title: 'Profile Update',
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
                    title: 'Password Update',
                    first_name: decoded.first_name,
                    last_name: decoded.last_name,
                    userId: decoded.userId
                })
            })
        } else {
            res.redirect('/')
        }
    })
    app.get('/subjective', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            verify(jwtoken, process.env.TEACHER_JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('logCheck')
                    res.redirect('/')
                }
                res.render('teacher/subjective', {
                    title: 'Subjective',
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
                    title: 'MCQ Question',
                    first_name: decoded.first_name,
                    last_name: decoded.last_name,
                    userId: decoded.userId
                })
            })
        } else {
            res.redirect('/')
        }
    })
    app.get('/question-bank', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            verify(jwtoken, process.env.TEACHER_JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('logCheck')
                    res.redirect('/')
                }
                res.render('teacher/question-bank', {
                    title: 'Question Bank',
                    first_name: decoded.first_name,
                    last_name: decoded.last_name,
                    userId: decoded.userId
                })
            })
        } else {
            res.redirect('/')
        }
    })
    app.get('/question-bank/mcq-question/:action_id', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            verify(jwtoken, process.env.TEACHER_JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('logCheck')
                    res.redirect('/')
                }
                res.render('teacher/question-bank-question', {
                    title: 'Question Bank MCQ',
                    first_name: decoded.first_name,
                    last_name: decoded.last_name,
                    userId: decoded.userId
                })
            })
        } else {
            res.redirect('/')
        }
    })
    app.get('/subjective/mcq-question/:action_id', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            verify(jwtoken, process.env.TEACHER_JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('logCheck')
                    res.redirect('/')
                }
                res.render('teacher/subjective-question', {
                    title: 'Subjective MCQ',
                    first_name: decoded.first_name,
                    last_name: decoded.last_name,
                    userId: decoded.userId
                })
            })
        } else {
            res.redirect('/')
        }
    })
    app.get('/preparation-exam', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            verify(jwtoken, process.env.TEACHER_JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('logCheck')
                    res.redirect('/')
                }
                res.render('teacher/preparation-exam', {
                    title: 'Preparation Exam',
                    first_name: decoded.first_name,
                    last_name: decoded.last_name,
                    userId: decoded.userId
                })
            })
        } else {
            res.redirect('/')
        }
    })
    app.get('/preparation-exam/mcq-question/:action_id', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            verify(jwtoken, process.env.TEACHER_JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('logCheck')
                    res.redirect('/')
                }
                res.render('teacher/preparation-question', {
                    title: 'Preparation MCQ',
                    first_name: decoded.first_name,
                    last_name: decoded.last_name,
                    userId: decoded.userId
                })
            })
        } else {
            res.redirect('/')
        }
    })
    app.get('/users', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            verify(jwtoken, process.env.TEACHER_JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('logCheck')
                    res.redirect('/')
                }
                res.render('teacher/users', {
                    title: 'Users',
                    first_name: decoded.first_name,
                    last_name: decoded.last_name,
                    userId: decoded.userId
                })
            })
        } else {
            res.redirect('/')
        }
    })
    app.get('/user-deleted', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            verify(jwtoken, process.env.TEACHER_JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('logCheck')
                    res.redirect('/')
                }
                res.render('teacher/users-deleted', {
                    title: 'Users Deleted',
                    first_name: decoded.first_name,
                    last_name: decoded.last_name,
                    userId: decoded.userId
                })
            })
        } else {
            res.redirect('/')
        }
    })
    app.get('/notice-board', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            verify(jwtoken, process.env.TEACHER_JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('logCheck')
                    res.redirect('/')
                }
                res.render('teacher/notice-board', {
                    title: 'Notice Board',
                    first_name: decoded.first_name,
                    last_name: decoded.last_name,
                    userId: decoded.userId
                })
            })
        } else {
            res.redirect('/')
        }
    })
    app.get('/user-packages', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            verify(jwtoken, process.env.TEACHER_JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('logCheck')
                    res.redirect('/')
                }
                res.render('teacher/user-packages', {
                    title: 'User Packages',
                    first_name: decoded.first_name,
                    last_name: decoded.last_name,
                    userId: decoded.userId
                })
            })
        } else {
            res.redirect('/')
        }
    })
    app.get('/user-packages/subscriber/:action_id', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            verify(jwtoken, process.env.TEACHER_JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('logCheck')
                    res.redirect('/')
                }
                res.render('teacher/packages-subscriber', {
                    title: 'Subscriber User',
                    first_name: decoded.first_name,
                    last_name: decoded.last_name,
                    userId: decoded.userId
                })
            })
        } else {
            res.redirect('/')
        }
    })
    app.get('/package-payment', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            verify(jwtoken, process.env.TEACHER_JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('logCheck')
                    res.redirect('/')
                }
                res.render('teacher/package-payment', {
                    title: 'Package Payment',
                    first_name: decoded.first_name,
                    last_name: decoded.last_name,
                    userId: decoded.userId
                })
            })
        } else {
            res.redirect('/')
        }
    })
    app.get('/logout', (req, res) => {
        res.clearCookie('log_token')
        res.clearCookie('logCheck')
        res.redirect('/')
    })
}