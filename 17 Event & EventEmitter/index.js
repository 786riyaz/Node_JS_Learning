const express = require ("express");
const app = express ();

const EventEmitter = require ("events");
const event = new EventEmitter();

let counter = 0;
event.on("countAPI", ()=>{
    counter++;
    console.log("Inside the count API Event ==> Counter :", counter);
})

app.get('/',(req,res)=>{
    console.log("Inside the Get Fuction");
    res.send("API Called");
    event.emit("countAPI");
});

app.post('/create',(req,res)=>{
    console.log("Inside the Post Fuction");
    res.send("API Called");
    event.emit("countAPI");
});

app.put('/update',(req,res)=>{
    console.log("Inside the Put Fuction");
    res.send("API Called");
    event.emit("countAPI");
});

app.listen(786);