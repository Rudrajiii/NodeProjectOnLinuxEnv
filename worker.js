const { parentPort } = require("worker_threads");
let counter = 0;
for(let i = 0 ; i < 2_00_000_000_00 ; i++){
        counter++;
}
parentPort.postMessage(counter);


