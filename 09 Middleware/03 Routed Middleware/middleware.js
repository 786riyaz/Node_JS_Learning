// making separate file for middlewares is good practice, in this way you can handle various middlewares efficiently

module.exports = reqFilter = (req, res, next) => {
    console.log("In side Middlewaare ===> reqFilter");
    if (!req.query.age) {
        res.send("Please provide Age...");
        console.log("Age is not provided");
    } else {
        console.log("Age is already Provided ::: ", req.query.age);
        if(req.query.age >= 18){
        console.log("Age is Greater Than 18 ::: ", req.query.age);
        next();
        } else {
            console.log("Age is less than 18. Not Allowed.....");
            res.send("Age is less than 18. Not Allowed to view the page.")
        }
    }
}