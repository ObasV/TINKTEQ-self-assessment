const express = require('express');
const verifyJWT = require('../middlewares/verifyJWT.js');
const { isAdmin, isShipper, isCarrier } = require('../middlewares/checkRole.js');
const {httpRegisterUser, httpGetUsers, httpUpdateUser} = require("../controllers/user_controller.js")
const userRouter = express.Router();

userRouter.post("/register", httpRegisterUser);
userRouter.get("/", verifyJWT, httpGetUsers);
userRouter.put("/update", verifyJWT,  isAdmin, httpUpdateUser);

module.exports = userRouter;




