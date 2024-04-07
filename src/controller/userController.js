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
module.exports = {
    handleLogin: handleLogin
}