const express = require("express");
const { Worker } = require("worker_threads");
const PORT = 7000;
const server = express();

const THREAD_COUNT = 4;
server.get("/non-blocking" , (req , res) => {
    res.status(200).send("Executed Properly..")
})

function createWorker(){
    return new Promise((resolve , reject) => {
        const worker = new Worker("./four-workers.js" , {
            workerData : {
                thread_count : THREAD_COUNT
            }
        });

        worker.on("message" , (data) => {
            resolve(data);

        });

        worker.on("error" , (error) => {
            reject("Error occured:" +error);

        });
    })

    
}

server.get("/blocking" ,async (req , res) => {
    const workerPromises = [];
    
    for(let i = 0 ; i < THREAD_COUNT ; i++){
        workerPromises.push(createWorker());
    }
    const thread_results = await Promise.all(workerPromises);
    const total = thread_results[0] + thread_results[1] + thread_results[2] + thread_results[3];
    res.status(200).send("Total Count after threading:" + total);

})
server.listen(PORT , () => {
    console.log(`SERVER LISTENING ON PORT ${PORT}`);
});



