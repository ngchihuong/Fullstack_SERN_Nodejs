import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";
import doctorController from "../controller/doctorController"

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/about", homeController.getAboutPage);
    router.get("/crud", homeController.getCRUD);

    //post api
    router.post("/post-crud", homeController.postCRUD)
    //display getCRUD
    router.get("/get-crud", homeController.displayGetCRUD);

    //edit crud
    router.get("/edit-crud", homeController.getEditCRUD)
    //put /put-crud.....-> post
    router.post("/put-crud", homeController.putCRUD)

    //delete
    router.get("/delete-crud", homeController.deleteCRUD);
    //res api
    router.get("/thu", (req, res) => {
        return res.send("Phung Minh Thu");
    });

    //API
    router.post("/api/login", userController.handleLogin)
    router.get('/api/get-all-users', userController.handleGetAllUsers)
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)

    router.get('/api/allcode', userController.getAllCode)
    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome)

    router.get('/api/get-all-doctors', doctorController.getAllDoctors)
    router.post('/api/save-infor-doctors', doctorController.postInforDoctor)
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById)

    return app.use("/", router)
}
module.exports = initWebRoutes;