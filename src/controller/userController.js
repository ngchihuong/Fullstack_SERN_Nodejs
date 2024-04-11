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
        userData : userData.user ? userData.user : {}
    })
}
let handleGetAllUsers = async(req,res) => {

    let id = req.body.id; //all / id

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter!',
            users : []
        })
    }
    let users = await userService.getAllUser(id); 
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        users 
    })
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers
}