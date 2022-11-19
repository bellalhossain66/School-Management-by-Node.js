const {
    teacherRegistration,
    teacherLogIn,
    profileView,
    profileUpdate,
    passwordUpdate
} = require('./controller')
const router = require('express').Router()
const { teacher_check_token } = require('../../authentication/valided')

router.post('/registration', teacherRegistration)
router.post('/login', teacherLogIn)
router.get('/profile/:userId', teacher_check_token, profileView)
router.patch('/profile-update', teacher_check_token, profileUpdate)
router.patch('/password-update', teacher_check_token, passwordUpdate)

module.exports = router