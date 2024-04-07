import { where } from "sequelize";
import db from "../models/index"
import bcrypt, { hash } from "bcryptjs";


let handleUserLogin = async (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exitst
                let user = await db.User.findOne({
                    where : {email : email},
                    attributes: ['email','roleId', 'password'],
                    raw : true,
                        // exclude: ['password'],

                })
                if (user) {
                //compare password
                   let check = bcrypt.compareSync(password, user.password); //false
                   if (check) {
                    userData.errorCode = 0,
                    userData.errMessage = 'OK';

                    delete user.password
                    userData.user = user
                   }else {
                    userData.errorCode = 3;
                    userData.errMessage = 'Wrong password';
                   }
                }else {
                    userData.errorCode = 2,
                    userData.errMessage = "User's not found!"
                }
            } else {
                // return (error)
                userData.errorCode = 1;
                userData.errMessage = `Your's email not exitst in your system. Pls try other email!`;
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin
}