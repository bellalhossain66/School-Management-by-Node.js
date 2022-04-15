const { verify } = require('jsonwebtoken')

module.exports = (app) => {
    app.get('/logout', (req, res) => {
        res.clearCookie('log_token')
        res.clearCookie('logCheck')
        res.redirect('/')
    })
    app.get('/all-student', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            verify(jwtoken, process.env.ADMIN_JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('logCheck')
                    res.redirect('/')
                }
                res.render('admin/student', {
                    title: 'Admin/Student',
                    name: decoded.name,
                    email: decoded.email
                })
            })
        } else {
            res.redirect('/')
        }
    })
    app.get('/all-teacher', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.logCheck == 'true') {
            verify(jwtoken, process.env.ADMIN_JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('logCheck')
                    res.redirect('/')
                }
                res.render('admin/teacher', {
                    title: 'Admin/Teacher',
                    name: decoded.name,
                    email: decoded.email
                })
            })
        } else {
            res.redirect('/')
        }
    })
}