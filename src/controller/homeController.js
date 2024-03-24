import db from "../models/index"
import CRUDService from "../service/CRUDService";

let getHomePage = async(req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs',
        {
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.log(error);
    }
}
let getAboutPage = (req, res) => {
    return res.render('./test/about.ejs')
}
let getCRUD = (req, res) => {
    return res.render("./crud.ejs");
}
let postCRUD = async (req, res) =>{
    let message = await CRUDService.createNewUser(req.body);
    // console.log(message,"-body",req.body);
    return await res.send("CRUD from server");
}
let displayGetCRUD = async(req, res) => {
    let data = await CRUDService.getAllUser();
    // console.log("--------");
    // console.log(data);
    return res.render("./display-crud.ejs", {
        dataTable: data
    })
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;

    if (userId) {
    let userData = await CRUDService.getUserInfoById(userId)
    console.log("aaa",userData);
        return res.render("./edit-crud.ejs", {
            user: userData 
        })
    }else{
       return res.send("User's not found!")  
    }
}

let putCRUD = async(req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render("./display-crud.ejs", {
        dataTable: allUsers 
    })
}
module.exports = {
    getHomePage : getHomePage, 
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD
}