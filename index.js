const express = require("express");
const { Worker } = require("worker_threads");
const PORT = 7000;
const server = express();

server.get("/non-blocking" , (req , res) => {
    res.status(200).send("Executed Properly..")
})

server.get("/blocking" ,async (req , res) => {
    const worker = new Worker("./worker.js");
    worker.on("message" , (data) => {
        res.status(200).send("Total Count:" + data);
    })
    worker.on("error" , (error) => {
        res.status(404).send("error" + error);
    })
})
server.listen(PORT , () => {
    console.log(`SERVER LISTENING ON PORT ${PORT}`);
});



