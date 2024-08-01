import cluster from 'cluster';
import os from 'os';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


let __dirname = dirname(fileURLToPath(import.meta.url));

const cpuCount = os.cpus().length;

console.log(`The total number of CPUs is ${cpuCount}`);
console.log(`Primary pid=${process.pid}`);
cluster.setupPrimary({
    exec:__dirname + "/cluster.js",
});

for(let i = 0 ; i < cpuCount ; i++){
    cluster.fork();
}
cluster.on("exit" , (worker , code , signal)=>{
    console.log(`worker ${worker.process.pid} has been killed.`);
    console.log("Started another worker");
    cluster.fork();
});