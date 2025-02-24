const connection = require('../config/database');
const {getAllUsers, createUserService, getUserId, updateUser,deleteUser} = require('../services/CRUDServices');


const getHomepage = async (req,res) => {
   let results = await getAllUsers();
   return res.render('homePage.ejs', {listUsers:results});
}

const getCreate = (req,res) =>{
    res.render('create.ejs')
}
const createUser = async (req,res) =>{
    const {username, password, email } = req.body; // Lấy dữ liệu từ form
    await createUserService(username,password,email);
    res.redirect('/');
}
const editUser = async (req,res) =>{
    const userId = req.params.id;
    let results= await getUserId(userId);
    console.log(results);
    return res.render('update.ejs',{user: results})
}

const handleUpdateUser  = async (req,res) =>{
    const userId = req.params.id;
    const {username, password, email} = req.body;
    const results = await updateUser(userId,username,password,email);
    res.redirect('/')
}

const handleDeleteUser = async (req,res) =>{
    const userId = req.params.id;
    const results = await deleteUser(userId);
    console.log('Xoa thanh cong');
    res.redirect('/')
}



module.exports = {
    getHomepage,
    createUser,
    getCreate,
    editUser,
    handleUpdateUser,
    handleDeleteUser
}