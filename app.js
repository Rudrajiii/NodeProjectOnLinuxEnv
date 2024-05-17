const express = require('express');
const app = express();
const PORT = 9000;
app.get("/" , (req , res)=>{
    res.send("Successfully Run on Linux Ecosytem");
});

app.listen(PORT , ()=>{
    console.log("Server Running");
})