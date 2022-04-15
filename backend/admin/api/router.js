const {
    adminLogIn,
    studentDataFetch,
    teacherDataFetch,
    studentBanBy,
    teacherBanBy,
    deleteStudent,
    deleteTeacher,
    studentPermitBy,
    teacherPermitBy
} = require('./controller')
const router = require('express').Router()
const { admin_check_token } = require('../../authentication/valided')

router.post('/login', adminLogIn)
router.get('/all-student', admin_check_token, studentDataFetch)
router.get('/all-teacher', admin_check_token, teacherDataFetch)
router.patch('/ban-student', admin_check_token, studentBanBy)
router.patch('/ban-teacher', admin_check_token, teacherBanBy)
router.patch('/permit-student', admin_check_token, studentPermitBy)
router.patch('/permit-teacher', admin_check_token, teacherPermitBy)
router.delete('/student-delete', admin_check_token, deleteStudent)
router.delete('/teacher-delete', admin_check_token, deleteTeacher)

module.exports = router