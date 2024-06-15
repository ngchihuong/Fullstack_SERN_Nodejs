import { where } from "sequelize";
import db from "../models/index"
import bcrypt, { hash } from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

let handleUserLogin = async (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exitst
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
                    raw: true,
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
                    } else {
                        userData.errorCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
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
let getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (userId === 'All') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    },
                })
            }
            if (userId && userId !== 'All') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email exists

            let check = await checkUserEmail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    errMessage: "Your email is already in used, Plz try another email!"
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,

                })
                resolve({
                    errCode: 0,
                    messgae: 'OK'
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let foundUser = await db.User.findOne({
            where: { id: userId }
        })
        if (!foundUser) {
            resolve({
                errCode: 2,
                errMessage: 'The user not exists!'
            })
        }
        await db.User.destroy({
            where: { id: userId }
        })
        resolve({
            errCode: 0,
            messgae: 'The user is deleted!'
        })

    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters!'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName,
                user.lastName = data.lastName,
                user.address = data.address,
                user.roleId = data.roleId,
                user.positionId = data.positionId
                user.gender = data.gender
                user.phonenumber = data.phonenumber

                await user.save()

                // await db.User.save({
                //     firstName: data.firstName,
                //     lastName: data.lastName,
                //     address: data.address
                // })
                resolve({
                    errCode: 0,
                    messgae: "Update the use success!"
                })
            } else {
                resolve({
                    errCode: 1,
                    messgae: 'User not found!'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }

        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService
}