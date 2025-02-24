// viet ve cac chuc nang cua web
const express = require('express');
const {getHomepage, createUser, getCreate, editUser,handleUpdateUser,handleDeleteUser} = require('../controllers/homeController')
const router = express.Router();

router.get('/' , getHomepage);
router.post('/create-user',createUser);
router.get('/create', getCreate);
router.get('/update/:id', editUser);
router.post('/update/:id', handleUpdateUser);
router.post('/delete/:id',handleDeleteUser);

module.exports = router;