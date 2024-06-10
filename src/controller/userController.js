import userService from "../service/userService"

let handleLogin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    if (!email || !password) {
        return res.status(500).json({
            errorCode: 1,
            message: 'Missing inputs parameter',
        })
    }
    let userData = await userService.handleUserLogin(email, password)
    console.log(userData);
    return res.status(200).json({
        errorCode: userData.errorCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}
let handleGetAllUsers = async (req, res) => {

    let id = req.query.id; //all / id

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter!',
            users: []
        })
    }
    let users = await userService.getAllUser(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        users
    })
}
let handleCreateNewUser = async (req, res) => {
    let messgae = await userService.createNewUser(req.body);
    // console.log(messgae);
    return res.status(200).json(messgae)

}
let handleEditUser = async (req, res) => {
    let data = req.body;
    let messgae = await userService.updateUserData(data);
    res.status(200).json(messgae)
}
let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    let messgae = await userService.deleteUser(req.body.id);
    return res.status(200).json(messgae)
}
let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data);
    } catch (error) {
        console.log('Get All code error:',error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        })
    }
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode
}