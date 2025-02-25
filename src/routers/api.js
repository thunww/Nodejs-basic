const express = require('express');
const router = express.Router();
const {handleAllUsers,handleDeleteUser,handleUpdateUser,createUser} = require('../controllers/APIController');

const initAPIRoute = (app) => {
    router.get('/users', handleAllUsers);
    router.post('/users', createUser);
    router.put('/users/:id', handleUpdateUser);
    router.delete('/users/:id', handleDeleteUser);
   // router.post('/dangnhap',handleDangNhap),
    return app.use('/api/v1/', router);
}

module.exports = initAPIRoute;