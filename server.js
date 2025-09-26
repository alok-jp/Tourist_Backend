const userRouter = require("./routes/User.js");

const express = require('express');
const app = express();

//================================================== App config ===========================================//
const Port = process.env.PORT || 3000;

app.use(express.json());

//================================================== Routers ============================================//

app.use("api/v1/", userRouter);



app.get('/', (req,res) => {
    res.send("API is running");
})

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
})

