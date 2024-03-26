import express from "express";
import homeController  from "../controller/homeController";

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

    return app.use("/", router)
}
module.exports = initWebRoutes;