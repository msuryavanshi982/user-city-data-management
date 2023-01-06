const express = require('express')
const router = express.Router();
const cityController = require('../controllers/cityController')
const userController = require('../controllers/userController')


router.post('/createCity', cityController.createCity)

router.get('/getCities', cityController.getCities, (req, res) => {
    return res.render({ data: res.data })
})

router.post('/createUser', userController.createUser)

router.get('/getUser', userController.getUser, (req, res) => {
    return res.render({ data: res.data })
})

router.patch('/UpdateUser/:Id', userController.UpdateUser);

module.exports = router;