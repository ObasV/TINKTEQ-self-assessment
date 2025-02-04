const express = require('express');
const userRouter = require("./routes/user_route");
const authRouter = require("./routes/auth_route");



let app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('*', (req, res) =>{
    res.json({message:'page not found'})
});


module.exports = app;