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
module.exports = {
    getHomePage : getHomePage, 
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD
}