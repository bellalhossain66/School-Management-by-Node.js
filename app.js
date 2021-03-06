require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookie = require('cookie-parser')
const path = require('path')
const adminRouter = require('./backend/admin/api/router')
const studentRouter = require('./backend/student/api/router')
const teacherRouter = require('./backend/teacher/api/router')

app.use(express.json())
app.use(express.static(__dirname + '/frontend/public'))
app.set('views', path.join(__dirname, 'frontend/views'))
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: false }))
app.use(cookie())
app.use('/api/admin', adminRouter)
app.use('/api/student', studentRouter)
app.use('/api/teacher', teacherRouter)

require('./frontend/controller/index')(app)
require('./frontend/controller/admin/index')(app)
require('./frontend/controller/student/index')(app)
require('./frontend/controller/teacher/index')(app)

app.listen(process.env.APP_PORT, () => {
    console.log('Server is running in port: ', process.env.APP_PORT)
})