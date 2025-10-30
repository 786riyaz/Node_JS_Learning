const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get("/", function (req, res) {
  // let token = jwt.sign({email: "riyaz@example.com"}, "secret");
  
  // disables 'iat' field
  let token = jwt.sign({ email: "riyaz@example.com" }, "secret", { noTimestamp: true, });

  res.cookie("token", token);
  console.log(token);
  res.send("done");
});

app.get("/read", function (req, res) {
  let data = jwt.verify(req.cookies.token, "secret");
  if (data.email === "riyaz@example.com") {
    res.send("Hello Riyaz, <BR> Your Balance in 786.");
  } else {
    res.send("You are not authorized to read the amount");
  }
  // res.send("data : " + JSON.stringify(data));
  console.log(data);
});

app.listen(786, () => {
  console.log("Server running at port 786");
});
