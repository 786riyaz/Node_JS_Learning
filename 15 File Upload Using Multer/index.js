const express = require("express");
const multer = require("multer");
const app = express();

const upload = multer ({
    storage:multer.diskStorage({
        destination:function (req,file,cb){
            cb(null, "uploads")
        },
        filename:function(req,file,cb){
            cb(null, file.fieldname + "-" + Date.now() + ".jpg")
        }
    })
}).single("user_DP"); 

app.post("/upload", upload, (req, res)=>{
    console.log("Inside the Upload Function using POST Method");
    // console.log("Request :::");
    // console.log(req);
    console.log("File Uploaded");
    res.send("File Uplopaded");
})

app.listen(786);