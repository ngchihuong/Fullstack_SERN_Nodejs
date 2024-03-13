import express from "express";
import bodyParser from "body-parser";   
//query paramas - user?id = 7;
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDb from "./config/connectDb"
require('dotenv').config();

let app = express();

//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

viewEngine(app);
initWebRoutes(app);

connectDb();

let port = process.env.PORT || 5000;
//if port default undefine then port run 5000


app.listen(port, () => {
    //callback 
    console.log("Back end nodejs is running on the port ", port);
})