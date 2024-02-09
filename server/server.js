const express = require("express");
const dbRoutes = require('./src/database/routes');
const app = express();
const PORT = 3000;
const cors = require('cors');
const siteUrlDev="http://localhost:8080";
const siteUrlProd="https://mysitevue.onrender.com";

app.use(express.json());
app.use(cors({
    origin:  app.get("env") == "development"?
    siteUrlDev: siteUrlProd,
}));
app.get("/", (req, res)=> {
    res.send("Hello Proxiad Backend!");
});
app.use("/api/v1/database", dbRoutes);
app.listen(PORT, function check(err)
{
    console.log("devurl: "+ siteUrlDev);
    console.log("produrl: "+ siteUrlProd);
    console.log("env: "+ app.get("env"));
    if(err)
    console.log("error");
    else
    console.log("started on port "+ PORT);
});