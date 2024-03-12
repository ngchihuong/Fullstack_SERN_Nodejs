import express from "express";
import homeController  from "../controller/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/about", homeController.getAboutPage);
    //res api
    router.get("/thu", (req, res) => {
        return res.send("Phung Minh Thu");
    });

    return app.use("/", router)
}
module.exports = initWebRoutes;