import express from 'express';
const PORT = 2000;
const app = express();

//Routes
app.get("/heavy" , (req , res) => {
    let total = 0;
    for(let i=0 ; i < 50_000_000 ; i++){
        total++;
    }
    res.send(`CPU intensive task result is : ${total}`);
})

app.listen(PORT , () => {
    console.log(`Server Running at Port ${PORT}`);
    console.log(`worker pid: ${process.pid}`)
})